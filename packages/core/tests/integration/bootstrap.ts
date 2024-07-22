import {PrismaService, UsersService} from "../../src/services";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../../src/modules";
import {CommonExceptionFilter} from "../../src/filters";
import {clearDatabase, generateToken} from "../../src/helpers";
import * as request from "supertest";
import {User} from "@prisma/client";
import {env} from "../../src/configs";
import type {BootstrapData} from "../types";

export const bootstrap = async (users: Omit<User, 'createdAt' | 'id'>[]): Promise<BootstrapData> => {
  const {jwt: {accessTokenSecret, refreshTokenSecret}} = env();
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const prisma = new PrismaService();
  const userService = new UsersService(prisma);

  const app = moduleFixture.createNestApplication();

  app.useGlobalFilters(new CommonExceptionFilter());

  await clearDatabase(prisma);

  await prisma.user.createMany({
    data: users
  })

  const user = await prisma.user.findUnique({
    where: {
      email: users[0].email
    }
  });

  const httpServer = await request(app.getHttpServer())

  await app.init();

  return {
    app,
    tokens: {
      accessToken: generateToken(user, {secret: accessTokenSecret}),
      refreshToken: generateToken(user, {secret: refreshTokenSecret}),
    },
    user,
    userService,
    httpServer,
    prisma
  }
}
