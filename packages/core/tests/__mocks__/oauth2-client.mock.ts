import {VerifyIdTokenOptions} from "google-auth-library";
import {JwtService} from "@nestjs/jwt";
import {JwtDecoded} from "../../src/interfaces";

export const mockVerifyTokenId = jest.fn(({idToken, audience }: VerifyIdTokenOptions) => {
  const jwtService = new JwtService();

  const user = jwtService.decode<JwtDecoded>(idToken);

  if(audience.includes(user.aud)) {
    return Promise.resolve({
      getPayload: jest.fn(() => user),
    });
  }

  return Promise.reject(new Error('Invalid audience'));
})
