import { ApolloServer } from 'apollo-server-express';
import express, { Request, Response } from 'express';
import { Connection, createConnection, useContainer } from 'typeorm';
import Con from './utils/tconfig';
import schema from './utils/sconfig';
import { Container } from 'typeorm-typedi-extensions';
import dotenv from 'dotenv';
import { MiddlewareGraphql } from './middleware/mconfig';
import cors from 'cors';
import jwt from 'express-jwt';
import path from 'path';
import { secretKey } from './utils/key';

dotenv.config();

const app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  jwt({
    secret: secretKey,
    credentialsRequired: false,
    algorithms: ['RS256'],
    getToken: function fromHeaderOrQueryString(req: Request) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  })
);

const PORT = process.env.PORT || 8000;

useContainer(Container);

export const con = async (drop: boolean = false): Promise<Connection> => {
  return createConnection(Con)
    .then(async (con) => {
      const apollo = new ApolloServer({
        schema: await schema,
        context: (): MiddlewareGraphql => {
          return {
            con,
          };
        },
      });

      apollo.applyMiddleware({ app });

      return con;
    })
    .catch((err) => {
      return err;
    });
};

con();

if (process.env.TESTING.toString() === 'false') {
  app.use('/static', express.static(path.join(__dirname, 'server/static')));
  app.use(express.static(path.join(__dirname, '../dist')));
  app.use('*', (req: Request, res: Response) => {
    return res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
  app.listen(PORT, () => {
    console.log('application running');
  });
}
