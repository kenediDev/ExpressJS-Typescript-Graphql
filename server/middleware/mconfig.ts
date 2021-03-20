import { Connection } from 'typeorm';

export interface MiddlewareGraphql {
  con: Connection;
}
