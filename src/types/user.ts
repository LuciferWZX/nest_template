export enum UserRole {
  user = 'user',
  vip = 'vip',
  admin = 'admin',
  superAdmin = 'superAdmin',
  system = 'system',
}
export interface IUser {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  iat?: number;
  exp?: number;
}
