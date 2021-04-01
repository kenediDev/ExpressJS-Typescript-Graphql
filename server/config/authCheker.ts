import { AuthChecker } from 'type-graphql';

export interface TUser {
  user: {
    id: string;
    username: string;
    email: string;
    createAt: Date;
    updateAt: Date;
    password: string;
  };
  iat: number;
}

export interface TChecker {
  user: TUser;
}

export const AuthCheker: AuthChecker<TChecker> = ({ context }) => {
  // console.log(context.user.user, 'THIS FROM AUTHCHEKER');
  if (context.user.user) {
    return true;
  }
  return false;
};
