import { Module } from '@nestjs/common';
import { UsersService } from '../services';
import { User } from '../entities';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersResolver } from "../resolvers";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
