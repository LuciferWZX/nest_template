import { UserRole } from '../types';

export class SignUpDto {
  username: string;
  nickname: string;
  password: string;
  avatar?: string;
  role?: UserRole;
}
