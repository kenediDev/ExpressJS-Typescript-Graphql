import 'reflect-metadata';
import { graphql } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Connection } from 'typeorm';
import { app } from '../server';
import { schemaTest } from '../config/sconfig';
import path from 'path';
import fs from 'fs';

let con: Connection;
beforeAll(async () => {
  con = await app.createCon();
});

afterAll(async () => {
  if (await con) {
    await con.close();
  }
});

interface Context {
  name: string;
  value: string | number;
}

const read = fs.readFileSync(
  path.join(__dirname, '../utils-test/requirementsTest.json'),
  { encoding: 'utf-8' }
);

export const writes = (context: Context) => {
  const parse = JSON.parse(read).map((x) => {
    return {
      count: context.name === 'total' ? context.value : x.count,
      token: context.name === 'token' ? context.value : x.token,
    };
  });
  return parse;
};

export const active = JSON.parse(read)[0].count;

export const token = JSON.parse(read)[0].token;

console.log(active, token);

interface Options {
  source: any;
  variableValues?: Maybe<{ options: any }>;
}

export const callSchema = async ({ source, variableValues }: Options) => {
  return graphql({
    schema: await schemaTest,
    source,
    variableValues,
  });
};
