export interface EnvDatabase {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}
export interface EnvRedis {
  host: string;
  port: number;
}
export interface EnvJWT {
  secret: string;
  expiresIn: number;
}
