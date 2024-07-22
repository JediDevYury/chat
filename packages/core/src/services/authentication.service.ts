import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";
import {ActiveUserData} from "../interfaces";
import {RefreshTokenInput} from "../inputs";
import {User} from '@prisma/client';
import {PrismaService} from "./prisma.service";


@Injectable()
export class AuthenticationService {
  constructor(
   private readonly prisma: PrismaService,
   private readonly jwtService: JwtService,
   private readonly configService: ConfigService,
  ) {}

  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(
       user.id,
       this.configService.get('jwt.accessTokenTtl'),
       {
         secret: this.configService.get('jwt.accessTokenSecret')
       }
      ),
      this.signToken(
       user.id,
       this.configService.get('jwt.refreshTokenTtl'),
        {
          secret: this.configService.get('jwt.refreshTokenSecret')
        }
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshTokenInput: RefreshTokenInput) {
    const { sub } = await this.jwtService.verifyAsync<
     Pick<ActiveUserData, 'sub'>
    >(refreshTokenInput.refreshToken, {
      secret: this.configService.get('jwt.refreshTokenSecret'),
    });

    const user = await this.prisma.user.findUnique({
      where: {
        id: sub,
      },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.generateTokens(user);
  }


  private async signToken<T extends {
    secret?: string;
  }>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
     {
       sub: userId,
       ...payload,
     },
     {
       secret: "secret" in payload ?
        payload.secret :
        this.configService.get('jwt.accessTokenSecret'),
       expiresIn,
     },
    );
  }
}
