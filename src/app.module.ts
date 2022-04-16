import { Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CustomConfigModule } from './config/custom-config.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './common/guards';

const modules = [
  ConfigModule.forRoot({ isGlobal: true }),
  CustomConfigModule,
  TodoModule,
  AuthModule,
  UsersModule,
];

const providers: Provider[] = [
  {
    provide: APP_GUARD,
    useClass: AccessTokenGuard,
  },
];

const domain = [AppService, PrismaService];

@Module({
  imports: [...modules],
  controllers: [AppController],
  providers: [...domain, ...providers],
})
export class AppModule {}
