import {
  AllowNull,
  Column,
  DataType,
  Table,
  Model,
  Unique,
  Index,
  DeletedAt,
  BeforeCreate,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Libs } from '../lib';
import { WorkspaceType } from '../types/workspace';
import { User } from './user';

@Table({ tableName: 'tb_workspace' })
export class Workspace extends Model {
  @Column({
    primaryKey: true,
    comment: '工作目录的id',
  })
  id: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '父级目录的id',
  })
  parentId: string | null;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '工作目录的名称',
  })
  name: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '工作目录的类型',
    defaultValue: WorkspaceType.file,
  })
  type: WorkspaceType;
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '创建者的id',
  })
  creatorId: number;
  @BelongsTo(() => User, 'creatorId')
  creator: User;
  @DeletedAt
  deletedAt: Date;

  @BeforeCreate
  static addId(instance: Workspace) {
    instance.id = Libs.generateId();
  }
}
