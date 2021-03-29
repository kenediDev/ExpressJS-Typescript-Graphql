import { buildTypeDefsAndResolvers, ResolversMap } from 'type-graphql';
import Container from 'typedi';
import { GeneralResolver } from '../schema/resolver/resolverGeneral';
import path from 'path';

import { AuthCheker } from './authCheker';

export const schema = async (): Promise<{
  typeDefs: any;
  resolvers: ResolversMap<any, any>;
}> => {
  return await buildTypeDefsAndResolvers({
    resolvers: [GeneralResolver],
    validate: false,
    container: Container,
    authMode: 'null',
    authChecker: AuthCheker,
    dateScalarMode: 'timestamp',
    emitSchemaFile: {
      path: path.resolve(__dirname, '../schema/typeDefs/schema.graphql'),
      commentDescriptions: true,
      sortedSchema: false,
    },
  });
};
