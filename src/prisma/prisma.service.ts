import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PageQueryParam } from '../common/decorators/pagination.decorator';
import { prismaLogging } from './prisma-logging.middleware';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
  implements OnModuleInit
{
  constructor() {
    super({
      log: [{ level: 'query', emit: 'event' }],
    });
  }

  onModuleInit() {
    this.$use(prismaLogging);
    this.$connect();
    this.$on('query', async (event: Prisma.QueryEvent) => {
      console.log(event.query, event.params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  static paginationQuery<T = Object>(
    pagination: PageQueryParam,
    originalQuery: T,
  ): T {
    return pagination.enabled
      ? {
          take: pagination.pageSize,
          skip: (pagination.pageIndex - 1) * pagination.pageSize,
          ...originalQuery,
        }
      : originalQuery;
  }
}
