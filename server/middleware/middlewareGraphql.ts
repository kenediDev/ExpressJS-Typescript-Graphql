import { Request } from 'express';
import { Connection } from 'typeorm';

export interface MiddlewareGraphql {
  req: Request;
  con: Connection;
}
