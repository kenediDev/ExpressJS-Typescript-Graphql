// General Package
import { ApolloServer } from 'apollo-server-express';
import express, { Request } from 'express';
import { Connection, createConnection, useContainer } from 'typeorm';
import schema from '../config/sconfig';
import Con from '../config/tconfig';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import { Container } from 'typeorm-typedi-extensions';
import jwt from 'express-jwt';
var bodyparser = require('body-parser');
var cookiesParser = require('cookie-parser');
// Configure Graphql as Middleware
import { MiddlewareGraphql } from '../middleware/middlewareGraphql';

// Webpack
import middleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import webConfig from '../../wconf/webpack.common';
import webDev from '../../wconf/webpack.dev';

// I18NEXT
import { i18nINIT } from '../utils/translate';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-express-middleware';
import i18nBackend from 'i18next-node-fs-backend';
import i18nCache from 'i18next-localstorage-cache';
import i18nsprintf from 'i18next-sprintf-postprocessor';

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
    this.app.use(cookiesParser());
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
    if (!process.env.prod || false) {
      this.webpackMiddleware();
    }

    this.translate();
  }

  private webpackMiddleware() {
    // Webpack
    const compiler = webpack(webDev);
    this.app.use(middleware(compiler));
    this.app.use(
      hotMiddleware(compiler, {
        publicPath: webConfig.output.publicPath,
      })
    );
  }

  public translate() {
    // I18next
    i18next
      .use(i18nextMiddleware.LanguageDetector)
      .use(i18nBackend)
      .use(i18nCache)
      .use(i18nsprintf)
      .init({
        ...i18nINIT,
      });
    this.app.use(i18nextMiddleware.handle(i18next));
  }

  async createCon(): Promise<Connection> {
    // Typeorm
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

  async apolloMiddleware(con: Connection) {
    // Apollo
    const apollo = new ApolloServer({
      schema: await schema,
      context: (req: Request): MiddlewareGraphql => {
        i18next.changeLanguage('id');
        return {
          req,
          con,
        };
      },
    });
    apollo.applyMiddleware({ app: this.app });
  }

  listen() {
    if (!process.env.test || false) {
      this.app.listen(this.port, () => {
        console.log('running application ' + this.port);
      });
    }
  }
}
