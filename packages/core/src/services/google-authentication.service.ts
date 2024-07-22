import {Injectable, OnModuleInit, UnauthorizedException} from '@nestjs/common';
import {OAuth2Client} from 'google-auth-library';
import {ConfigService} from '@nestjs/config';
import {AuthenticationService} from './authentication.service';
import {PrismaService} from "./prisma.service";
import {Prisma} from "@prisma/client";
import {Logger} from "nestjs-pino";

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauth2Client: OAuth2Client;

  constructor(
   private readonly configService: ConfigService,
   private readonly authService: AuthenticationService,
   private readonly prisma: PrismaService,
   private readonly logger: Logger,
  ) {}

  async onModuleInit() {
    this.oauth2Client = new OAuth2Client();
  }

  async authenticate(token: string) {
    const loginTicket = await this.oauth2Client.verifyIdToken({
      idToken: token,
      audience: [
        this.configService.get('google.iosClientId'),
        this.configService.get('google.androidClientId')
      ],
    });

    const {email, sub: userId, given_name, email_verified} = loginTicket.getPayload();

    if (!email_verified) {
      throw new UnauthorizedException('Email not verified');
    }

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: {
          email,
        },
        create: {
          email,
          fullName: given_name,
        },
        update: {
          fullName: given_name,
        }
      });

      this.logger.log(`User ${user.id} logged in`);

      await tx.authProvider.create({
        data: {
          userId: user.id,
          provider: "google",
          providerId: userId,
        }
      });

      const tokens = await this.authService.generateTokens(user);

      return {
        user,
        tokens,
      }
    }, {
      isolationLevel: Prisma.TransactionIsolationLevel.ReadUncommitted,
    });
  }
}
