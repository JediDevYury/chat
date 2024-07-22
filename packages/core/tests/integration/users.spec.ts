import {bootstrap} from "./bootstrap";
import {generateBody} from "../helpers";
import {User} from "@prisma/client";
import {Response} from "supertest";
import type {BootstrapData} from "../types";
import {clearDatabase} from "../../src/helpers";

describe('GraphQL UsersResolver (e2e) {Supertest}', () => {
  let data: BootstrapData;
  let currentUsers: User[]

  beforeAll(async () => {
    data = await bootstrap([{email: "test@test.com", fullName: "John Doe" }]);
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
     .expect(function (res: Response) {
       const response = res.body;

       expect(response.data.users).toEqual(currentUsers.map((user) => ({
          ...user,
          id: user.id.toString(),
          createdAt: user.createdAt.getTime(),
       })));
     })
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
     .expect(function (res: Response) {
        const response = res.body;

        expect(response.data.user).toEqual({
          ...user,
          id: user.id.toString(),
        });
     });
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
     .expect(function (res) {
       const response = res.body;

       expect(response.data.updateUser).toEqual({
          ...variables.updateUserInput,
          id: currentUsers[0].id.toString(),
       });
     });
  })
});
