import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { isAuthException } from "../helpers";

@Catch()
export class AuthErrorFilter implements ExceptionFilter {
  catch(exception: HttpException & {
    code?: string | number;
  }, host: ArgumentsHost) {
    const pgUniqueViolationErrorCode = '23505';

    if (exception.code === pgUniqueViolationErrorCode) {
      throw new ConflictException();
    }

    if(isAuthException(exception)) {
      throw new UnauthorizedException(exception.message);
    }

    if(exception instanceof NotFoundException) {
      throw new NotFoundException(exception.message);
    }

    throw new InternalServerErrorException();
  }
}
