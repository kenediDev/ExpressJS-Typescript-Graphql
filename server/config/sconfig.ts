import {
  buildSchema,
  buildTypeDefsAndResolvers,
  ResolversMap,
} from 'type-graphql';
import Container from 'typedi';
import { GeneralResolver } from '../schema/resolver/resolverGeneral';
import { UserResolver } from '../schema/resolver/userResolver';

import { AuthCheker } from './authCheker';

const resolvers: any[any] = [GeneralResolver, UserResolver];

export const schema = async (): Promise<{
  typeDefs: any;
  resolvers: ResolversMap<any, any>;
}> => {
  return await buildTypeDefsAndResolvers({
    resolvers: resolvers,
    validate: false,
    container: Container,
    authMode: 'null',
    authChecker: AuthCheker,
    dateScalarMode: 'timestamp',
  });
};

export const schemaTest = buildSchema({
  resolvers: resolvers,
  validate: false,
  container: Container,
  authMode: 'null',
  authChecker: AuthCheker,
  // emitSchemaFile: path.resolve(__dirname, "__snapshots__.gql")
});
