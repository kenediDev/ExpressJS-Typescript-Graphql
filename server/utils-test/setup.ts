import 'reflect-metadata';
import { graphql } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Connection } from 'typeorm';
import { app } from '../server';
import { schema } from '../config/sconfig';
import path from 'path';
import fs from 'fs';
import { MiddlewareGraphql } from '../middleware/middlewareGraphql';

let con: Connection;
beforeAll(async () => {
  con = await app.createCon();
});

afterAll(async () => {
  if (await con) {
    await con.close();
  }
});

export const read = fs.readFileSync(
  path.join(__dirname, '../utils-test/requirementsTest.json'),
  { encoding: 'utf-8' }
);

export const active = JSON.parse(read)[0].count;

export const token = JSON.parse(read)[0].token;

interface Options {
  source: any;
  variableValues?: Maybe<{ options: any }>;
  rootValue?: any;
  contextValue?: MiddlewareGraphql;
}

export const callSchema = async ({
  source,
  variableValues,
  rootValue,
  contextValue,
}: Options) => {
  return graphql({
    schema: await schema,
    source,
    variableValues,
    rootValue,
    contextValue,
  });
};
