import {GoogleAuthenticationService} from "../services";
import {Args, Context,Mutation, Resolver} from "@nestjs/graphql";
import {GoogleTokenInput} from "../inputs";
import {ExtendedGqlExecutionContext} from "../interfaces";

@Resolver('GoogleAuthentication')
export class GoogleAuthenticationResolver {
  constructor(private readonly googleAuthenticationService: GoogleAuthenticationService) {}

  @Mutation('authenticate')
  async authenticate(
   @Args('googleTokenInput') googleTokenInput: GoogleTokenInput,
   @Context() ctx: ExtendedGqlExecutionContext
  ){
    const {user, tokens} = await this.googleAuthenticationService.authenticate(googleTokenInput.token);

    ctx.res.cookie('accessToken', tokens.accessToken, {httpOnly: true});
    ctx.res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true});

    return user;
  }
}
