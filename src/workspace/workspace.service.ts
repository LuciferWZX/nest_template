import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Workspace } from '../models/workspace';
import { WorkspaceType } from '../types/workspace';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel(Workspace) private workspaceModel: typeof Workspace,
  ) {}
  async saveOne(params: {
    name: string;
    type: WorkspaceType;
    creatorId: string;
    parentId?: string;
  }) {
    if (params.parentId) {
      const parentDir = await this.workspaceModel.findOne({
        rejectOnEmpty: undefined,
        where: {
          parentId: params.parentId,
        },
      });
      if (!parentDir) {
        throw new BadRequestException('父级不存在');
      }
      if (parentDir.type !== WorkspaceType.dir) {
        throw new BadRequestException('父级不是目录类型');
      }
    }
    const workspace = await this.workspaceModel.findOne({
      rejectOnEmpty: undefined,
      where: {
        name: params.name,
        type: params.type,
        parentId: params.parentId ?? null,
      },
    });
    if (workspace) {
      throw new BadRequestException('该目录已存在同名文件');
    }
    return this.workspaceModel.create({
      creatorId: params.creatorId,
      name: params.name,
      type: params.type,
      parentId: params.parentId,
    });
  }
}
