import {bootstrap} from "./bootstrap";
import {generateBody, responseChecker} from "../helpers";
import {User} from "@prisma/client";
import type {BootstrapData} from "../types";
import {clearDatabase} from "../../src/helpers";

describe('GraphQL UsersResolver (e2e) {Supertest}', () => {
  let data: BootstrapData;
  let currentUsers: User[]

  beforeAll(async () => {
    data = await bootstrap([{email: "test@test.com", fullName: "John Doe"}]);
    currentUsers = await data.prisma.user.findMany()
  });

  afterAll(async () => {
    await clearDatabase(data.prisma);
    await data.app.close();
  });

  it('should get users', async () => {
    return data.httpServer
     .post('/graphql')
     .send(generateBody('USERS'))
     .expect(responseChecker('users', currentUsers.map((user) => ({
       ...user,
       createdAt: user.createdAt.getTime(),
       id: user.id.toString(),
     }))));
  });

  it('should get user by id', async () => {
    const {createdAt, ...user} = await data.prisma.user.findUnique({
      where: {
        id: currentUsers[0].id
      }
    })

    return data.httpServer
     .post('/graphql')
     .set('Authorization', `Bearer ${data.tokens.accessToken}`)
     .send(generateBody('USER', {
       userId: currentUsers[0].id
     }))
     .expect(responseChecker('user', {
       ...user,
       id: user.id.toString(),
     }));
  });

  it('should update user', async () => {
    const variables = {
      updateUserId: currentUsers[0].id,
      updateUserInput: {
        email: 'new.email@test.com',
        fullName: 'New Test User',
      }
    }

    return data.httpServer
     .post('/graphql')
     .set('Authorization', `Bearer ${data.tokens.accessToken}`)
     .send(generateBody('UPDATE_USER', variables))
     .expect(responseChecker('updateUser', {
       ...variables.updateUserInput,
       id: currentUsers[0].id.toString(),
     }));
  })
});
