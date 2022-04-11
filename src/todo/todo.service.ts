import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PageQueryParam } from '../common/decorators/pagination.decorator';
import {
  paginationOf,
  PaginationRecords,
} from '../common/interfaces/pagination.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(page: PageQueryParam): Promise<PaginationRecords<Todo>> {
    const query = PrismaService.paginationQuery<Prisma.TaskFindManyArgs>(page, {
      orderBy: {
        dateCreated: 'desc',
      },
    });

    const [records, dataAmount] = await this.prismaService.$transaction([
      this.prismaService.task.findMany(query),
      this.prismaService.task.count(),
    ]);

    return paginationOf(page, dataAmount, records);
    // return await this.prismaService.task.findMany();
  }

  async find(id: number): Promise<Todo> {
    return await this.prismaService.task.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.TaskCreateInput): Promise<Todo> {
    return await this.prismaService.task.create({ data });
  }

  async update(id: number, data: Prisma.TaskUpdateInput): Promise<Todo> {
    return await this.prismaService.task.update({
      data,
      where: { id },
    });
  }
}
