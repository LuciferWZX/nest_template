import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { QueueName, WorkflowJobData } from '../types';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { Libs } from '../lib';

@Processor(QueueName.workflow)
export class WorkflowConsumer extends WorkerHost {
  private readonly logger = new Logger(WorkflowConsumer.name);
  @OnWorkerEvent('active')
  onActive(job: Job<WorkflowJobData>) {
    this.logger.log(`[${job.id}]处理工作流中`);
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
  @OnWorkerEvent('progress')
  progress(job: Job<WorkflowJobData>, progress) {
    this.logger.debug(`data：`, job.data);
    this.logger.log(`当前进度:${progress}`);
  }
  @OnWorkerEvent('completed')
  completed(job: Job<WorkflowJobData>, result, prev) {
    this.logger.debug(`result：`, result);

    this.logger.debug(`prev:${prev}`);
  }
  @OnWorkerEvent('error')
  error(failedReason: Error) {
    this.logger.error(`出错了`, failedReason);
  }
  @OnWorkerEvent('failed')
  failed(job: Job<WorkflowJobData>, err: Error, prev) {
    this.logger.error(`出错了`, err);
    console.log(prev);
  }

  /**
   * @description 当队列耗尽等待列表时，将触发此事件。请注意，可能仍有延迟的作业等待其计时器过期，只要等待列表已清空，此事件仍会触发
   */
  @OnWorkerEvent('drained')
  drained() {
    this.logger.log(`队列耗尽等待列表`);
  }
  @OnWorkerEvent('paused')
  paused() {
    this.logger.error(`该任务已暂停`);
  }
  @OnWorkerEvent('resumed')
  resumed() {
    this.logger.error(`该任务已恢复`);
  }

  /**
   * @description 当作业停止并已移回等待列表时，将触发此事件。
   * @param jobId
   * @param prev
   */
  @OnWorkerEvent('stalled')
  stalled(jobId: string, prev: string) {
    console.log('jobId', jobId);
    console.log('prev', prev);
    this.logger.log(`作业停止并已移回等待列表`);
  }
  @OnWorkerEvent('closed')
  closed() {
    this.logger.log(`已关闭`);
  }
  @OnWorkerEvent('closing')
  closing(msg: string) {
    this.logger.log(`正在关闭:${msg}`);
  }
  async process(job: Job<WorkflowJobData>) {
    this.logger.debug('Job id:', job.id);
    this.logger.debug('Job name:', job.name);
    const { nodes } = job.data;
    let progress = 0;
    const total = nodes.length;
    for (let i = 0; i < nodes.length; i++) {
      this.logger.debug(`开始：节点${i + 1}:${nodes[i].name}`);
      await Libs.sleep(1000);
      this.logger.debug(`完成：节点${i + 1}:${nodes[i].name}`);
      await job.updateData({
        uid: 'xx',
        nodes: [],
      });
      progress += 1;
      await job.updateProgress((progress / total) * 100);
    }
    // let progress = 0;
    // switch (job.name) {
    //   case ""
    // }
    // for (let i = 0; i < 100; i++) {
    //   this.logger.debug('Start transcoding...');
    //   this.logger.debug(job.data);
    //   this.logger.debug('Transcoding completed');
    //   progress += 1;
    //   job.progress = progress;
    // }
    return { result: 'success' };
  }
}
