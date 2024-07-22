import * as GraphQLTypes from '../../graphql';
import { IsNotEmpty } from "class-validator";

export class RefreshTokenInput extends GraphQLTypes.RefreshTokenInput {
  @IsNotEmpty()
  refreshToken: string;

  constructor(refreshTokenInput: GraphQLTypes.RefreshTokenInput) {
    super();
    Object.assign(this, refreshTokenInput);
  }
}
