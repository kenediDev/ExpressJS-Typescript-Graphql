import 'reflect-metadata';
import { graphql, GraphQLSchema } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Connection } from 'typeorm';
import { schema } from '../config/sconfig';
import { app } from '../server';
import { makeExecutableSchema } from 'apollo-server-express';

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

const sc = async (): Promise<GraphQLSchema> => {
  const { resolvers, typeDefs } = await schema();
  return makeExecutableSchema({
    resolvers,
    typeDefs,
  });
};

export const callSchema = async ({
  source,
  variableValues,
  language,
}: Options) => {
  return graphql({
    schema: await sc(),
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
