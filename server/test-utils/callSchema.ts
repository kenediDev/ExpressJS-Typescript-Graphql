import { Connection } from 'typeorm';
import { con } from '../server';
import { ExecutionResult, graphql } from 'graphql';
import schema from '../utils/sconfig';
import { Maybe } from 'graphql/jsutils/Maybe';

let conn: Connection;

beforeAll(async () => {
  conn = await con();
});

afterAll(async () => {
  await conn.close();
});

export interface Options {
  source: any;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

export const callSchema = async ({
  source,
  variableValues,
}: Options): Promise<ExecutionResult> => {
  return graphql({
    schema: await schema,
    source,
    variableValues,
  });
};
