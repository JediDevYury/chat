import {HttpException} from "@nestjs/common";

export function isAuthException(exception: HttpException): boolean {
  return "name" in exception && exception.name === 'TokenExpiredError' || exception.name === 'JsonWebTokenError' || new RegExp(/jwt/i).exec(exception.message) !== null;
}

export const extractTokenFromHeader = (request: Request): string | undefined => {
  const [,token] = request.headers["authorization"]?.split(' ') ?? [];
  return token;
}
