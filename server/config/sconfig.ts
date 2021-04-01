import {
  buildSchema,
  buildTypeDefsAndResolvers,
  ResolversMap,
} from 'type-graphql';
import Container from 'typedi';
import { GeneralResolver } from '../schema/resolver/resolverGeneral';
import { UserResolver } from '../schema/resolver/userResolver';

import { AuthCheker } from './authCheker';

export const schema = buildSchema({
  resolvers: [GeneralResolver, UserResolver],
  validate: true,
  container: Container,
  authChecker: AuthCheker,
  authMode: 'error',
});

export const schemaMiddleware = async (): Promise<{
  typeDefs: any;
  resolvers: ResolversMap<any, any>;
}> => {
  return buildTypeDefsAndResolvers({
    resolvers: [GeneralResolver, UserResolver],
    validate: true,
    container: Container,
    authChecker: AuthCheker,
    authMode: 'error',
  });
};
