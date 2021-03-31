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

const read = fs.readFileSync(path.join(__dirname, './requirementsTest.txt'), {
  encoding: 'utf-8',
});

export const active = Boolean(parseInt(read));

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
