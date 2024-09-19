import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../models/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(
    username: string,
    pass: string,
  ): Promise<(User & { access_token: string }) | null> {
    const user = await this.userService.findOne({
      username: username,
    });
    if (!user) {
      throw new UnauthorizedException('该用户不存在');
    }
    if (user.password !== pass) {
      throw new UnauthorizedException('密码不正确');
    }
    const { password, ...restUser } = user;
    const payload = { sub: user.id, ...restUser };
    return {
      ...restUser.dataValues,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
