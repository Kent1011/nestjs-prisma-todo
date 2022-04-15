import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Pagination, PageQueryParam } from '../common/decorators';
import { FindTasksType } from './dto/find-tasks.dto';
import { Todo } from './interfaces/todo.interface';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(
    @Pagination() page: PageQueryParam,
    @Query('type') type: FindTasksType,
  ) {
    return await this.todoService.findAll({ page, type });
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.find(+id);
  }

  @Post()
  async create(@Body() createDto: Prisma.TaskCreateInput): Promise<Todo> {
    return await this.todoService.create(createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.TaskUpdateInput,
  ): Promise<Todo> {
    return await this.todoService.update(+id, data);
  }

  @Patch(':id/complete')
  async markComplete(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.update(+id, { isFinished: true });
  }

  @Delete(':id')
  async removeTask(@Param('id') id: string) {
    return await this.todoService.delete(+id);
  }
}
