import {GraphQLSchema} from "graphql/type";
import {getDirective, MapperKind, mapSchema} from "@graphql-tools/utils";
import {UnauthorizedException} from "@nestjs/common";
import {REQUEST_USER_KEY} from "../../constants";
import {extractTokenFromHeader} from "../../helpers";
import {JwtService} from "@nestjs/jwt";
import {env} from "../../configs/env";

export const schemeTransformer = (schema: GraphQLSchema, directiveName: string) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const {jwt} = env();
      const jwtService = new JwtService({
        secret: jwt.secret,
        signOptions: {
          expiresIn: jwt.accessTokenTtl,
        },
      });

      const accessTokenGuardDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
      const transformedResolve = async (source, args, context, info) => {
        const {req} = context;
        const token = extractTokenFromHeader(req);

        if (!token) {
          throw new UnauthorizedException();
        }

        try {
          const payload = await jwtService.verifyAsync(token);

          req[REQUEST_USER_KEY] = payload;
        } catch(error) {
          throw new UnauthorizedException();
        }

        return fieldConfig.resolve(source, args, context, info);
      }

      return {
        ...fieldConfig,
        resolve: accessTokenGuardDirective ? transformedResolve : fieldConfig.resolve,
      }
    },
  });
}
