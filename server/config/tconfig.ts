import { createConnection } from 'typeorm';
import path from 'path';
import dotenv from 'dotenv';
import { test } from '../internal/__test_config__';

dotenv.config();

export default {
  type: test ? 'sqlite' : 'mysql',
  username: process.env.db_user,
  password: process.env.db_pass,
  database: test
    ? path.join(__dirname, '../../dbCircle.sqlite')
    : process.env.db_name,
  logging: false,
  synchronize: true,
  dropSchema: false,
  migrations: [path.join(__dirname, '../typeorm/migrations/*.ts')],
  subscribers: [path.join(__dirname, '../typeorm/subscribers/*.ts')],
  entities: [path.join(__dirname, '../typeorm/entity/*.ts')],
} as Parameters<typeof createConnection>[0];
