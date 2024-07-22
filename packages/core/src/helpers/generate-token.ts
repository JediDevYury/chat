import {User} from "../graphql";
import {JwtService} from "@nestjs/jwt";
import {env} from "../configs";

export const generateToken = <T extends {
  secret?: string;
}>(user: User, payload?: T) => {
  const jwtService = new JwtService();
  const variables = env();

  return jwtService.sign({
    sub: user.id,
    ...payload,
  }, {
    secret: "secret" in payload ? payload.secret : variables.jwt.accessTokenSecret,
    expiresIn: variables.jwt.accessTokenTtl,
  });
};
