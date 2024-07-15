import {Injectable } from "@nestjs/common";
import {User} from "../entities";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";
import {ActiveUserData} from "../interfaces";
import {RefreshTokenInput} from "../inputs";


@Injectable()
export class AuthenticationService {
  constructor(
   @InjectRepository(User) private readonly usersRepository: Repository<User>,
   private readonly jwtService: JwtService,
   private readonly configService: ConfigService,
  ) {}

  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
       user.id,
       this.configService.get('jwt.accessTokenTtl'),
      ),
      this.signToken(
       user.id,
       this.configService.get('jwt.refreshTokenTtl')
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
      secret: this.configService.get('jwt.secret'),
    });
    const user = await this.usersRepository.findOneByOrFail({
      id: sub,
    });
    return this.generateTokens(user);
  }


  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
     {
       sub: userId,
       ...payload,
     },
     {
       secret: this.configService.get('jwt.secret'),
       expiresIn,
     },
    );
  }
}
