import { Test, TestingModule } from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from "../../src/modules";
import {generateToken} from "../../src/helpers";
import {gql} from "./constants";
import {AUTHENTICATE, REFRESH_TOKENS} from "../../src/graphql/query-string-representations";
import {AuthErrorFilter} from "../../src/filters";

describe('GraphQL GoogleAuthenticationResolver (e2e) {Supertest}', () => {
  let app: INestApplication;

  let token: string

  let httpServer: ReturnType<typeof request>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    token = generateToken({id: 1, email:  "test@gmail.com", fullName: "Test User"});

    app = moduleFixture.createNestApplication();

    app.useGlobalFilters(new AuthErrorFilter());

    await app.init();

    httpServer = await request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return "UNAUTHENTICATED" error if error has been occurred during authentication', async () => {
    await httpServer
     .post(gql)
     .send({
       query: AUTHENTICATE,
       variables: {
         googleTokenInput: {
           token,
         }
       }
     })
     .expect(function(res) {
       const data = JSON.parse(res.text);

       expect(data.errors).toBeDefined();
       expect(data.errors[0].extensions.code).toBe("UNAUTHENTICATED");
     })
  });

  it('should return an "UNAUTHENTICATED" error if unauthenticated user did request', async () => {
    return httpServer.post('/graphql').send({
      query: `
          query {
            user(id: 1) {
              id
              email
              fullName
            }
          }
        `,
    }).expect(function(res) {
      const data = JSON.parse(res.text);

      expect(data.errors).toBeDefined();
      expect(data.errors[0].extensions.code).toBe("UNAUTHENTICATED");
    });
  });

  it('should refresh token', async () => {
    const refreshToken = generateToken({id: 1, email: "refresh.token@test.com", fullName: "Test User"});

    await httpServer
      .post(gql)
      .send({
        query: REFRESH_TOKENS,
        variables: {
          refreshTokenInput: {
            refreshToken,
          }
        }
      })
      .expect(function(res) {
        const response = JSON.parse(res.text);

        expect(response.data.refreshTokens.accessToken).toBeDefined();
        expect(response.data.refreshTokens.refreshToken).toBeDefined();
      });
  });
});
