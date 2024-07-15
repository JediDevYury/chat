import * as GraphQLTypes from "../../graphql";
import {IsNotEmpty} from "class-validator";

export class GoogleTokenInput extends GraphQLTypes.GoogleTokenInput {
  @IsNotEmpty()
  token: string;

  constructor(googleTokenInput: GraphQLTypes.GoogleTokenInput) {
    super();
    Object.assign(this, googleTokenInput);
  }
}
