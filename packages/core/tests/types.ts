import {PrismaClient, User} from "@prisma/client";
import * as request from "supertest";
import {INestApplication} from "@nestjs/common";
import {UsersService} from "../src/services";

export type Tokens = {
  accessToken: string;
  refreshToken: string;
}

export type BootstrapData = {
  tokens: Tokens
  user: User
  httpServer: ReturnType<typeof request>
  app: INestApplication
  prisma: PrismaClient
  userService: UsersService
}
