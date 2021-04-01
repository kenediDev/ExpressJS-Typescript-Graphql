import { Express, Request, Response } from 'express';
import { Connection } from 'typeorm';

export class T implements Express.User {
  user: {
    id: string;
    username: string;
    email: string;
    createAt: Date;
    updateAt: Date;
    password: string;
  };
  iat: number;
}

export interface MiddlewareGraphql {
  con?: Connection;
  user?: T;
  req?: Request;
  res?: Response;
}
