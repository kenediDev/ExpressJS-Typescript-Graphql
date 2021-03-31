import { createConnection } from 'typeorm';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default {
  type: process.env.test ? 'sqlite' : 'mysql',
  username: process.env.db_user,
  password: process.env.db_pass,
  database: process.env.test
    ? path.join(__dirname, '../../dbTest.sqlite')
    : process.env.db_pass,
  synchronize: true,
  logging: false,
  migrations: [path.join(__dirname, '../typeorm/migrations/*.ts')],
  subscribers: [path.join(__dirname, '../typeorm/subscribers/*.ts')],
  entities: [path.join(__dirname, '../typeorm/entity/*ts')],
} as Parameters<typeof createConnection>[0];
