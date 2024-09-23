import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Workspace } from '../models/workspace';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [JwtModule, SequelizeModule.forFeature([Workspace])],
  controllers: [WorkspaceController],
  providers: [
    WorkspaceService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class WorkspaceModule {}
