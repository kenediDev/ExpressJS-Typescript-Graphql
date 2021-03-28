import { Request } from 'express';
import { I18next } from 'i18next-express-middleware';
import { Connection } from 'typeorm';

export interface MiddlewareGraphql {
  req: Request;
  con: Connection;
  i18n: I18next;
}
