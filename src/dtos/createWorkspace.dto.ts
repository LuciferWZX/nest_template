import { WorkspaceType } from '../types/workspace';

export class CreateWorkspaceDto {
  name: string;
  type: WorkspaceType;
  parentId?: string;
}
