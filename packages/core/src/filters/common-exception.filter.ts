import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import {isNotFoundException, isUniqueViolation, isAuthException} from "../helpers";

@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException & {
    code?: string | number;
  }, host: ArgumentsHost) {

    if (isUniqueViolation(exception)) {
      throw new ConflictException();
    }

    if(isAuthException(exception)) {
      throw new UnauthorizedException(exception.message);
    }

    if(isNotFoundException(exception)) {
      console.error(exception);
      return;
    }

    throw new InternalServerErrorException();
  }
}
