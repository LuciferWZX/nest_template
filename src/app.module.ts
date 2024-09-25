import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { EnvDatabase, EnvRedis } from './config/type';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ResponseInterceptor } from './interceptor/Response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WorkspaceModule } from './workspace/workspace.module';
import { BullModule } from '@nestjs/bullmq';
import { WorkflowModule } from './workflow/workflow.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ['./src/env/.env.dev', './src/env/.env'],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<EnvDatabase>('database');
        return {
          dialect: 'mysql',
          host: config.host,
          port: config.port,
          username: config.user,
          password: config.password,
          database: config.database,
          autoLoadModels: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<EnvRedis>('redis');
        return {
          connection: {
            host: config.host,
            port: config.port,
            user: config.username,
            password: config.password,
          },
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    WorkspaceModule,
    WorkflowModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
