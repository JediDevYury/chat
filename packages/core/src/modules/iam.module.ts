import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User, AuthProvider} from "../entities";
import {JwtService} from "@nestjs/jwt";
import {AuthenticationService, GoogleAuthenticationService} from "../services";
import {GoogleAuthenticationResolver, AuthenticationResolver} from "../resolvers";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AuthProvider]),
  ],
  providers: [
    AuthenticationResolver,
    GoogleAuthenticationResolver,
    AuthenticationService,
    GoogleAuthenticationService,
    JwtService,
  ],
})

export class IamModule {}
