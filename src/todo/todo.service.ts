import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  paginationOf,
  PaginationRecords,
} from '../common/interfaces/pagination.interface';
import { PrismaService } from '../prisma/prisma.service';
import { defaultFindTasksDto, FindTasksDto } from './dto/find-tasks.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    findTaskOptions?: FindTasksDto,
  ): Promise<PaginationRecords<Todo>> {
    const findTasksDto: FindTasksDto = {
      ...defaultFindTasksDto,
      ...findTaskOptions,
    };

    const where: Prisma.TaskWhereInput = {};
    if (findTasksDto.type !== 'all') {
      where.isFinished = findTasksDto.type === 'onlyFinished';
    }

    const query = PrismaService.paginationQuery<Prisma.TaskFindManyArgs>(
      findTasksDto.page,
      {
        orderBy: {
          dateCreated: 'desc',
        },
        where,
      },
    );

    const [records, dataAmount] = await this.prismaService.$transaction([
      this.prismaService.task.findMany(query),
      this.prismaService.task.count({ where }),
    ]);

    return paginationOf(findTasksDto.page, dataAmount, records);
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
      data: {
        ...data,
        dateFinished: !!data.isFinished ? new Date() : null,
      },
      where: { id },
    });
  }

  async delete(id: number): Promise<Todo> {
    return await this.prismaService.task.delete({ where: { id } });
  }
}
