import * as GraphQLTypes  from '../../graphql';
import {IsEmail, IsNotEmpty, IsString} from "class-validator";
export class UpdateUserInput extends GraphQLTypes.UpdateUserInput {
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(input: GraphQLTypes.UpdateUserInput) {
    super();
    Object.assign(this, input);
  }
}
