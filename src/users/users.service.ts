import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(dto: Prisma.UserWhereUniqueInput) {
    return await this.prismaService.user.findUnique({
      where: dto,
    });
  }

  async create(data: CreateUserDto) {
    return await this.prismaService.user.create({
      data,
    });
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.prismaService.user.update({ where: { id }, data });
  }
}
