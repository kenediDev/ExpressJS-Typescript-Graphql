import "reflect-metadata"
import { graphql } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Connection } from 'typeorm';
import schema from '../config/sconfig';
import { app } from '../server';

let con: Connection;
beforeAll(async () => {
  con = await app.createCon();
});

afterAll(async () => {
  await con.close();
});

interface Options {
  source: any;
  variableValues?: Maybe<{ options: any }>;
  contextValue?: any;
}

export const callSchema = async ({
  source,
  variableValues,
  contextValue,
}: Options) => {
  return graphql({
    schema: await schema,
    source,
    variableValues,
    contextValue,
  });
};
