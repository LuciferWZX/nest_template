import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateWorkspaceDto } from '../dtos/createWorkspace.dto';
import { User } from '../models/user';
import { WorkspaceService } from './workspace.service';

@Controller('workspace')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}
  @UseGuards(AuthGuard)
  @Post('create')
  create(@Request() req, @Body() createWorkspaceDto: CreateWorkspaceDto) {
    const user: User = req.user;
    return this.workspaceService.saveOne({
      parentId: createWorkspaceDto.parentId,
      name: createWorkspaceDto.name,
      type: createWorkspaceDto.type,
      creatorId: user.id,
    });
  }
}
