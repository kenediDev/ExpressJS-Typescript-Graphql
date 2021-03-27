import { AuthChecker } from 'type-graphql';

export const AuthCheker: AuthChecker<any> = (
  { root, args, context, info },
  roles
) => {
  return true;
};
