import {ApolloServerErrorCode} from "@apollo/server/errors";
import {excludePropertyFromObject} from "./exclude-property-from-object";
import {GraphQLFormattedError} from "graphql/error";
import {HttpException} from "@nestjs/common";

export const formatError = (formattedError) => {
  if("originalError" in formattedError.extensions) {
    return {
      message: formattedError.message,
      code: formattedError.extensions.code,
    }
  }

  if (formattedError.extensions.code === ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED) {
    return {
      ...formattedError,
      message: "Your query doesn't match the schema. Try double-checking it!",
    };
  }

  return excludePropertyFromObject(formattedError, ['locations', 'path']) as GraphQLFormattedError;
}

export function isAuthException(exception: HttpException): boolean {
  return "name" in exception && exception.name === 'TokenExpiredError' || exception.name === 'JsonWebTokenError' || new RegExp(/jwt/i).exec(exception.message) !== null;
}

export function isUniqueViolation(exception: HttpException): boolean {
  return "code" in exception && exception.code === '23505';
}

export function isNotFoundException(exception: HttpException): boolean {
  return "name" in exception && exception.name === 'NotFoundException';
}
