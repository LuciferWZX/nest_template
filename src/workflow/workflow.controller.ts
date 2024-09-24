import { Body, Controller, Post, Request } from '@nestjs/common';
import { User } from '../models/user';
import { WorkflowService } from './workflow.service';
import { WorkflowNodeType } from '../types';

@Controller('workflow')
export class WorkflowController {
  constructor(private workflowService: WorkflowService) {}
  @Post('/debug')
  async debug(@Request() req, @Body() data: { nodes: WorkflowNodeType[] }) {
    const user: User = req.user;
    return this.workflowService.add(user.id, data.nodes);
  }
}
