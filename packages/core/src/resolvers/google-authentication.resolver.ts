import {GoogleAuthenticationService} from "../services";
import {Args, Context, Mutation, Resolver} from "@nestjs/graphql";
import {ExtendedGqlExecutionContext} from "../types";
import {GoogleTokenInput} from "../types";

@Resolver('GoogleAuthentication')
export class GoogleAuthenticationResolver {
  constructor(private readonly googleAuthenticationService: GoogleAuthenticationService) {}

  @Mutation('authenticate')
  async authenticate(
   @Args('googleTokenInput') googleTokenInput: GoogleTokenInput,
   @Context() ctx: ExtendedGqlExecutionContext
  ){
    const {user, tokens} = await this.googleAuthenticationService.authenticate(googleTokenInput.token);

    this.setTokensToCookie(ctx, tokens);

    return user;
  }

  setTokensToCookie(ctx: ExtendedGqlExecutionContext, tokens: {accessToken: string, refreshToken: string}) {
    ctx.res.cookie('accessToken', tokens.accessToken, {httpOnly: true});
    ctx.res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true});
  }
}
