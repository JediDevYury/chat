import {bootstrap} from "./bootstrap";
import {generateBody, responseChecker} from "../helpers";
import type {BootstrapData} from "../types";
import {clearDatabase} from "../../src/helpers";
import {User} from "../../src/graphql";

describe('GraphQL UsersResolver (e2e) {Supertest}', () => {
  let data: BootstrapData;
  let currentUsers: User[]

  beforeAll(async () => {
    data = await bootstrap([{email: "test@test.com", fullName: "John Doe"}]);
    const users = await data.prisma.user.findMany();

    currentUsers = await Promise.all(users.map(user => data.userService.toDto(user)));
  });

  afterAll(async () => {
    await clearDatabase(data.prisma);
    await data.app.close();
  });

  it('should get users', async () => {
    return data.httpServer
     .post('/graphql')
     .send(generateBody('USERS'))
     .expect(responseChecker('users', currentUsers));
  });

  it('should get user by id', async () => {
    const user = await data.prisma.user.findUnique({
      where: {
        id: currentUsers[0].id
      }
    })

    const userDto = await data.userService.toDto(user);

    return data.httpServer
     .post('/graphql')
     .set('Authorization', `Bearer ${data.tokens.accessToken}`)
     .send(generateBody('USER', {
       userId: currentUsers[0].id
     }))
     .expect(responseChecker('user', userDto));
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
       id: variables.updateUserId,
     }));
  })

  it('should delete user', async () => {
    const user = await data.prisma.user.findUnique({
      where: {
        id: currentUsers[0].id
      }
    });

    const userDto = await data.userService.toDto(user);

    return data.httpServer
     .post('/graphql')
     .set('Authorization', `Bearer ${data.tokens.accessToken}`)
     .send(generateBody('DELETE_USER', {
       deleteUserId: currentUsers[0].id
     }))
     .expect(responseChecker('deleteUser', userDto));
  });
});
