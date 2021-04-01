import { AuthChecker } from 'type-graphql';
import { T } from '../middleware/middlewareGraphql'

export interface TChecker {
  user: T;
}

export const AuthCheker: AuthChecker<TChecker> = ({ context }) => {
  // console.log(context.user.user, 'THIS FROM AUTHCHEKER');
  if (context.user.user) {
    return true;
  }
  return false;
};
