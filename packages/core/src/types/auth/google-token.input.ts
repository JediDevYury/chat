import {IsNotEmpty} from "class-validator";
import {TokenInput} from "../../graphql";

export class GoogleTokenInput extends TokenInput {
  @IsNotEmpty()
  token: string;

  constructor(googleTokenInput: GoogleTokenInput) {
    super();
    Object.assign(this, googleTokenInput);
  }
}
