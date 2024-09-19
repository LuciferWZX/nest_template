import {
  AllowNull,
  Column,
  DataType,
  Table,
  Model,
} from 'sequelize-typescript';
import { UserRole } from '../types';

@Table({ tableName: 'tb_user' })
export class User extends Model {
  @Column({
    primaryKey: true,
  })
  id: string;
  @Column(DataType.STRING)
  username: string;
  @Column(DataType.STRING)
  password: string;
  @Column(DataType.STRING)
  nickname: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  avatar: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '角色类型',
    defaultValue: UserRole.user,
  })
  role: UserRole;
}
