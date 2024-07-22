import {Injectable, NotFoundException} from '@nestjs/common';
import {UpdateUserInput} from "../graphql";
import {PrismaService} from "./prisma.service";

@Injectable()
export class UsersService {
  constructor(
   private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserInput: Partial<UpdateUserInput>) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if(!user) {
      throw new NotFoundException(`User #${id} does not exist`);
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    })
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

    return user;
  }
}
