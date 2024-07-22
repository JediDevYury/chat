import {Module} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {AuthenticationService, GoogleAuthenticationService} from "../services";
import {GoogleAuthenticationResolver, AuthenticationResolver} from "../resolvers";
import {PrismaModule} from "./prisma.module";
import {ConfigService} from "@nestjs/config";

@Module({
  imports: [PrismaModule],
  providers: [
    ConfigService,
    AuthenticationResolver,
    GoogleAuthenticationResolver,
    AuthenticationService,
    GoogleAuthenticationService,
    JwtService,
  ],
})
export class IamModule {}
