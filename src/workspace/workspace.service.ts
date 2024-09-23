import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Workspace } from '../models/workspace';
import { WorkspaceType } from '../types/workspace';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel(Workspace) private workspaceModel: typeof Workspace,
    private sequelize: Sequelize,
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
  async batchDelete(uid: string, ids: string[]) {
    try {
      await this.sequelize.transaction(async (t) => {
        // const transactionHost = { transaction: t };
        await this.workspaceModel.update(
          {
            deleterId: uid,
          },
          {
            transaction: t,
            where: {
              id: ids,
            },
          } as any,
        );
        const row = await this.workspaceModel.destroy({
          where: {
            id: ids,
            deleterId: uid,
          },
          transaction: t,
        } as any);
        if (row === 0) {
          throw new HttpException(
            {
              code: 404,
              message: '该目录或者文件已被删除',
              data: null,
            },
            404,
          );
        }
        return null;
      });
    } catch (err) {
      console.error('[workspace删除失败]', err);
      if (err instanceof HttpException) {
        throw err;
      }
      throw new BadRequestException('删除失败');
    }
  }
}
