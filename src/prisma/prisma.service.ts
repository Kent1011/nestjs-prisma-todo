import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PageQueryParam } from '../common/decorators/pagination.decorator';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
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
