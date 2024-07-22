import { Module } from '@nestjs/common';
import {UsersService} from '../services';
import {UsersResolver} from "../resolvers";
import {PrismaModule} from "./prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
