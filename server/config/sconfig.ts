import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { buildTypeDefsAndResolvers, ResolversMap } from 'type-graphql';
import Container from 'typedi';
import { GeneralResolver } from '../schema/resolver/resolverGeneral';

import { AuthCheker } from './authCheker';

const extensions = async (): Promise<{
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
  });
};

async function schema(): Promise<GraphQLSchema> {
  const { typeDefs, resolvers } = await extensions();
  return makeExecutableSchema({ typeDefs, resolvers });
}

export default schema;
