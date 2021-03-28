import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { Connection, createConnection, useContainer } from 'typeorm';
import schema from '../config/sconfig';
import Con from '../config/tconfig';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import { Container } from 'typeorm-typedi-extensions';
import jwt from 'express-jwt';
import i18nMiddleware from 'i18next-express-middleware';
import i18next from 'i18next';
import { i18nINIT } from '../utils/translate';
import FilesystemBackend from 'i18next-node-fs-backend';
import Cache from 'i18next-localstorage-cache';
import postProcessor from 'i18next-sprintf-postprocessor';
import LanguageDetector from 'i18next-browser-languagedetector';
import { MiddlewareGraphql } from '../middleware/middlewareGraphql';
var bodyparser = require('body-parser');

export class App {
  public port: string = process.env.port || '8000';
  public app: express.Application = express();
  constructor() {
    useContainer(Container);
    this.middleware();
  }

  private middleware() {
    this.createCon();
    this.extensions();
  }

  private extensions() {
    this.app.use(bodyparser.json());
    this.app.use(
      bodyparser.urlencoded({
        extended: true,
      })
    );
    this.app.use(cors());
    this.app.use('/static', express.static(path.join(__dirname, '../static')));
    this.app.use(
      morgan('common', {
        stream: fs.createWriteStream(
          path.join(__dirname, '../../log/access.log'),
          { flags: 'a' }
        ),
      })
    );
    this.app.use(
      jwt({
        secret: fs.readFileSync('jwtRS256.key', 'utf-8'),
        credentialsRequired: false,
        algorithms: ['RS256'],
        getToken: function fromHeaderOrQuerystring(req) {
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
    this.translate();
  }

  public translate() {
    i18next
      .use(i18nMiddleware.LanguageDetector)
      .use(FilesystemBackend)
      .use(Cache)
      .use(postProcessor)
      .use(LanguageDetector)
      .init(i18nINIT, (err, t) => {
        if (err) return console.log('somehing went wrong loading', err);
        t('login');
      });
    return i18next;
  }

  async apolloMiddleware(con: Connection) {
    const apollo = new ApolloServer({
      schema: await schema,
      context: ({ req }): MiddlewareGraphql => {
        return {
          req,
          con,
          i18n: this.translate(),
        };
      },
    });
    apollo.applyMiddleware({ app: this.app });
  }

  async createCon(): Promise<Connection> {
    const con = createConnection(Con);
    await con
      .then(async (cons) => {
        await this.apolloMiddleware(cons);
        return cons;
      })
      .catch((err) => {
        return err;
      });
    return con;
  }

  listen() {
    if (!process.env.test || false) {
      this.app.listen(this.port, () => {
        console.log('running application ' + this.port);
      });
    }
  }
}
