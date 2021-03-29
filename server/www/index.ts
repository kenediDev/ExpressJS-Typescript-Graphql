// Graphql
import 'apollo-cache-control';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { ApolloServer } from 'apollo-server-express';
import {
  loadFilesSync,
  makeExecutableSchema,
  mergeTypeDefs,
} from 'graphql-tools';
// General Package
import express from 'express';
import { Connection, createConnection, useContainer } from 'typeorm';
import { schema } from '../config/sconfig';
import Con from '../config/tconfig';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import { Container } from 'typeorm-typedi-extensions';
import jwt from 'express-jwt';
import dotenv from 'dotenv';

var bodyparser = require('body-parser');
var cookiesParser = require('cookie-parser');
var session = require('express-session');
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
import { UpperCaseDirective } from '../schema/directive/utils';

dotenv.config();

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
    this.translate();
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
    this.app.use(
      session({
        name: 'session',
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: true },
      })
    );
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
    const app = this.app;
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
      schema: await this.schemaMiddleware(),
      context: ({ req, res }): MiddlewareGraphql => {
        return {
          con,
        };
      },
      playground: true,
      introspection: true,
      plugins: [responseCachePlugin()],
    });

    apollo.applyMiddleware({ app: this.app });
  }

  public async schemaMiddleware() {
    const { resolvers } = await schema();
    const typeDefs = mergeTypeDefs(
      loadFilesSync(path.join(__dirname, '../schema/**/*.graphql'))
    );

    const scm = makeExecutableSchema({
      typeDefs,
      resolvers,
      schemaDirectives: {
        upper: UpperCaseDirective,
      },
    });
    return scm;
  }

  listen() {
    if (!process.env.test || false) {
      this.app.listen(this.port, () => {
        console.log('running application ' + this.port);
      });
    }
  }
}
