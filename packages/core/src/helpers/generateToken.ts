import {User} from "../graphql";
import {JwtService} from "@nestjs/jwt";
import {env} from "../configs/env";

export const generateToken = <T>(user: User, payload?: T) => {
  const jwtService = new JwtService();
  const variables = env();

  return jwtService.sign({
    sub: user.id,
    ...payload,
  }, {
    secret: variables.jwt.secret,
    expiresIn: variables.jwt.accessTokenTtl,
  });
};
