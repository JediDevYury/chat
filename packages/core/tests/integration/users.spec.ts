import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from "../../src/modules";
import {generateToken} from "../../src/helpers";
import {UPDATE_USER, USER, USERS} from "../../src/graphql/query-string-representations";

describe('GraphQL UsersResolver (e2e) {Supertest}', () => {
  let app: INestApplication;
  let httpServer: ReturnType<typeof request>;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    token = generateToken({id: 1, email: "test.email@test.com", fullName: "Test User"})
    app = moduleFixture.createNestApplication();

    await app.init();

    httpServer = await request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get users', async () => {
    return httpServer
     .post('/graphql')
     .send({
       query: USERS,
     })
     .expect(function (res) {
       const response = JSON.parse(res.text);

       expect(response.data.users.length).toBeGreaterThan(0);
       expect(response.data.users[0].id).toBeDefined();
     });
  });

  it('should get user by id', async () => {
    const userId = 1;

    return httpServer
     .post('/graphql')
     .set('Authorization', `Bearer ${token}`)
     .send({
       query: USER,
       variables: {userId},
     })
     .expect(function (res) {
       const response = JSON.parse(res.text);

       expect(response.data.user.id).toBe(userId);
     });
  });

  it('should update user', async () => {
    const variables = {
      updateUserId: '1',
      updateUserInput: {
        email: 'new.test.email@test.com',
        fullName: 'New Test User',
      }
    }

    return httpServer
     .post('/graphql')
     .set('Authorization', `Bearer ${token}`)
     .send({
       query: UPDATE_USER,
       variables
     })
     .expect(function (res) {
       const response = JSON.parse(res.text);

       const newUser = {
         ...variables.updateUserInput,
          id: variables.updateUserId,
       }

       expect(response.data.updateUser).toEqual(newUser);
     });
  })
});
