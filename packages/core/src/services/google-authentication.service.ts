import {Injectable, OnModuleInit, UnauthorizedException} from '@nestjs/common';
import {OAuth2Client} from 'google-auth-library';
import {ConfigService} from '@nestjs/config';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {AuthenticationService} from './authentication.service';
import {AuthProvider, User} from '../entities';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauth2Client: OAuth2Client;

  constructor(
   private readonly configService: ConfigService,
   private readonly authService: AuthenticationService,
   @InjectRepository(AuthProvider) private readonly authProviderRepository: Repository<AuthProvider>,
   @InjectRepository(User) private readonly userRepository: Repository<User>,
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

    const {generatedMaps: userGeneratedMaps} = await this.userRepository.upsert({
      email,
      fullName: given_name
    }, ['email']);

    await this.authProviderRepository.insert({
      userId: userGeneratedMaps[0].id,
      provider: "google",
      providerId: userId,
    });

    const tokens = await this.authService.generateTokens(userGeneratedMaps[0] as User);
    const user = await this.userRepository.findOne(userGeneratedMaps[0].id);

    return {
      user,
      tokens,
    }
  }
}
