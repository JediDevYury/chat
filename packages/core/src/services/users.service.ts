import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities";
import { Repository } from "typeorm";
import {CreateUserInput, UpdateUserInput} from "../graphql";
import { UserInputError} from "@nestjs/apollo";

@Injectable()
export class UsersService {
  constructor(
   @InjectRepository(User)
   private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new UserInputError(`User with id ${id} not found`);
    }

    return user;
  }

  async create(createUserInput: CreateUserInput) {
    const user = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserInput: Partial<UpdateUserInput>) {
    const user = await this.usersRepository.preload({
      id,
      ...updateUserInput,
    });

    if (!user) {
      throw new UserInputError(`User #${id} does not exist`);
    }

    return this.usersRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if(!user) {
      throw new UserInputError(`User #${id} does not exist`);
    }

    const removedUser = await this.usersRepository.remove(user);

    return Object.assign({}, removedUser, { id });
  }
}
