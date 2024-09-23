import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateWorkspaceDto } from '../dtos/createWorkspace.dto';
import { User } from '../models/user';
import { WorkspaceService } from './workspace.service';

@Controller('workspace')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

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
  @Post('delete')
  delete(@Request() req, @Body() deleteParams: { ids: string[] }) {
    const user: User = req.user;
    return this.workspaceService.batchDelete(user.id, deleteParams.ids);
  }
}
