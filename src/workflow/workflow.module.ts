import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowController } from './workflow.controller';
import { BullModule } from '@nestjs/bullmq';
import { QueueName } from '../types';
import { WorkflowConsumer } from './workflow.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueName.workflow,
    }),
  ],
  providers: [WorkflowService, WorkflowConsumer],
  controllers: [WorkflowController],
})
export class WorkflowModule {}
