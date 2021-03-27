import { buildSchema } from 'type-graphql';
import Container from 'typedi';
import { GeneralResolver } from '../schema/resolver/resolverGeneral';

import { AuthCheker } from './authCheker';

const schema = buildSchema({
  resolvers: [GeneralResolver],
  validate: false,
  container: Container,
  authMode: 'null',
  authChecker: AuthCheker,
});

export default schema;
