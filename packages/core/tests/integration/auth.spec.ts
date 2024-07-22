import type {Response} from 'supertest';
import {gql} from "./constants";
import {generateGqlError, generateBody} from "../helpers";
import {bootstrap} from "./bootstrap";
import type {BootstrapData} from "../types";

describe('GraphQL GoogleAuthenticationResolver (e2e) {Supertest}', () => {
  let data: BootstrapData;

  beforeAll(async () => {
     data = await bootstrap([{email: "test@test.com", fullName: "John Doe"}])
  });

  afterAll(async () => {
    await data.app.close();
  });

  it('should return "UNAUTHENTICATED" error if error has been occurred during authentication', async () => {
    await data.httpServer
     .post(gql)
     .send(generateBody("AUTHENTICATE", {
       googleTokenInput: {
         token: data.tokens.accessToken,
       }
     }))
     .expect(generateGqlError('No pem found for envelope: {"alg":"HS256","typ":"JWT"}', 'UNAUTHENTICATED'));
  });

  it('should refresh token', async () => {
    await data.httpServer
     .post(gql)
     .send(generateBody("REFRESH_TOKENS",{
       refreshTokenInput: {
         refreshToken: data.tokens.refreshToken,
       }
     }))
     .expect(function (res: Response) {
       for (const key of ['accessToken', 'refreshToken']) {
          expect(res.body.data.refreshTokens).toHaveProperty(key);
       }
     });
  });
});
