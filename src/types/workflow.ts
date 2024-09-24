export enum QueueName {
  workflow = 'workflow',
}
export type WorkflowJobData = {
  uid: string;
  nodes: WorkflowNodeType[];
};
export type WorkflowNodeType = {
  name: string;
  type: string;
};
