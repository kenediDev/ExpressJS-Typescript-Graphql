import 'reflect-metadata';
import { graphql } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Connection } from 'typeorm';
import { app } from '../server';
import { schemaTest } from '../config/sconfig';

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
  language?: any;
}

export const callSchema = async ({
  source,
  variableValues,
  language,
}: Options) => {
  return graphql({
    schema: await schemaTest,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          lng: language,
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    },
  });
};
