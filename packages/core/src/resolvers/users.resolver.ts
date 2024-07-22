import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UpdateUserInput} from "../inputs";
import {ParseIntPipe} from "@nestjs/common";
import {UsersService} from "../services";
import {User} from "@prisma/client";

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  async findAll() : Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query('user')
  async findOne(@Args('id', ParseIntPipe) id: number) : Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation('updateUser')
  async update(
   @Args('id', ParseIntPipe) id: number,
   @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation('deleteUser')
  async remove(
   @Args('id', ParseIntPipe) id: number,
   @Context() user: User,
  ): Promise<User> {
    return this.usersService.delete(id);
  }
}
