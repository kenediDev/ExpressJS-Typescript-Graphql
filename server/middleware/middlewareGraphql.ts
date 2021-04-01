import { Express, Request, Response } from 'express';
import { Connection } from 'typeorm';
import { TUser } from '../config/authCheker';

class T implements Express.User {
  user: TUser;
}

export interface MiddlewareGraphql {
  con?: Connection;
  user?: T;
  req?: Request;
  res?: Response;
}
