import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {RefreshTokenInput} from "../inputs";
import {AuthenticationService} from "../services";

@Resolver('authentication')
export class AuthenticationResolver {
  constructor(private readonly authService: AuthenticationService) {}

  @Mutation('refreshTokens')
  async refreshTokens(@Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput) {
    return this.authService.refreshTokens(refreshTokenInput);
  }
}
