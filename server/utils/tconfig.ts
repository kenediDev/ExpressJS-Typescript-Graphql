import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default {
  type: 'mysql',
  username: process.env.db_user,
  password: process.env.db_pass,
  database: process.env.db_name,
  synchronize: true,
  dropSchema: false,
  logging: false,
  migrations: [path.join(__dirname, '../typeorm/migrations/*.ts')],
  subscribers: [path.join(__dirname, '../typeorm/subscribers/*.ts')],
  entities: [path.join(__dirname, '../typeorm/entity/*.ts')],
} as Parameters<typeof createConnection>[0];
