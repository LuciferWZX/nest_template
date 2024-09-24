import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { QueueName, WorkflowJobData, WorkflowNodeType } from '../types';
import { Queue } from 'bullmq';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectQueue(QueueName.workflow)
    private workflowQueue: Queue<WorkflowJobData>,
  ) {}

  async add(uid: string, data: WorkflowNodeType[]) {
    console.log('add:', uid);
    const job = await this.workflowQueue.add(`${uid}-workflow`, {
      uid: uid,
      nodes: data,
    });
    return job;
  }
  async pause() {
    await this.workflowQueue.pause();
  }
  async resume() {
    await this.workflowQueue.resume();
  }
}
