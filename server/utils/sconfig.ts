import { AuthChecker, buildSchema } from 'type-graphql';
import { GeneralResolver } from '../schema/resolver/generalResolver';
import { Container } from 'typedi';
import { UserResolver } from '../schema/resolver/userResolver';

interface User {
  username: string;
  email: string;
}

const customAuthCheker: AuthChecker<User> = (
  { root, args, context, info },
  roles
) => {
  return true;
};

const schema = buildSchema({
  resolvers: [GeneralResolver, UserResolver],
  validate: false,
  container: Container,
  authChecker: customAuthCheker,
  authMode: 'null',
});

export default schema;
