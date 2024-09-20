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
} from 'sequelize-typescript';
import { UserRole } from '../types';
import { Libs } from '../lib';

@Table({ tableName: 'tb_user' })
export class User extends Model {
  @Column({
    primaryKey: true,
    comment: '用户id',
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名',
  })
  username: string;
  @Column(DataType.STRING)
  password: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    comment: '用户昵称',
  })
  nickname: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '用户头像',
    defaultValue: null,
  })
  avatar: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '角色类型',
    defaultValue: UserRole.user,
  })
  role: UserRole;

  @DeletedAt
  deletedAt: Date;

  @BeforeCreate
  static addId(instance: User) {
    instance.id = Libs.generateId();
  }
}
