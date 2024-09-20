import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../models/user';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async findOne(params: Partial<User>): Promise<User | null> {
    return this.userModel.findOne({
      rejectOnEmpty: undefined,
      where: { ...params },
    });
  }
  async saveOne(params: Partial<User>): Promise<User | null> {
    const user = await this.userModel.findOne({
      attributes: { include: ['username', 'nickname'] },
      where: {
        [Op.or]: [{ username: params.username }, { nickname: params.nickname }],
      },
    });
    if (user) {
      if (user.username === params.username) {
        throw new UnauthorizedException('用户名已存在');
      }
      if (user.nickname === params.nickname) {
        throw new UnauthorizedException('昵称已存在');
      }
    }
    return this.userModel.create({ ...params });
  }
}
