import { Injectable } from '@nestjs/common';
import { User } from '../models/user';
import { InjectModel } from '@nestjs/sequelize';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async findOne(params: Partial<User>): Promise<User | null> {
    return this.userModel.findOne({
      where: { ...params },
    });
  }
}
