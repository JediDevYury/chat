import * as GraphQLTypes from '../../graphql';
import {IsEmail, IsNotEmpty, IsString} from "class-validator";
export class CreateUserInput extends GraphQLTypes.CreateUserInput {
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(input: GraphQLTypes.CreateUserInput) {
    super();
    Object.assign(this, input);
  }
}
