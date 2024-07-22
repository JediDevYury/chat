import {Injectable, NotFoundException} from '@nestjs/common';
import {UpdateUserInput} from "../graphql";
import {PrismaService} from "./prisma.service";
import {User} from '@prisma/client';
import * as GraphQLTypes from '../graphql';

@Injectable()
export class UsersService {
  constructor(
   private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    const users = await this.prisma.user.findMany();

    return Promise.all(users.map(async (user) => this.toDto(user)));
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.toDto(user);
  }

  async update(id: number, updateUserInput: Partial<UpdateUserInput>) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if(!user) {
      throw new NotFoundException(`User #${id} does not exist`);
    }
    const newUser = await this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    })

    return this.toDto(newUser);
  }

  async delete(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if(!user) {
      throw new NotFoundException(`User #${id} does not exist`);
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return this.toDto(user);
  }

  async toDto(user: User): Promise<GraphQLTypes.User> {
    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
    }
  }
}
