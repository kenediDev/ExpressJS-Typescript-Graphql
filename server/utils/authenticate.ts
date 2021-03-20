import { UserEntity } from '../typeorm/entity/UserEntity';
import jwt from 'jsonwebtoken';
import { secretKey } from './key';
import { Repository } from 'typeorm';
import { loginUserInput } from '../schema/input/userInput';
import { UserQueryResponse } from '../schema/query/userQuery';

export const authenticateJWT = async (
  options: loginUserInput,
  con: Repository<UserEntity>
): Promise<UserQueryResponse> => {
  let message: string, status: number, token: any;
  message = 'Inccorect Username or Password';
  status = 400;
  const check = await con.findOne({
    where: [
      {
        username: options.token,
      },
      {
        email: options.token,
      },
    ],
  });
  if (check && check.verifyHash(options.password)) {
    status = 200;
    message = '';
    token = await jwt.sign({ user: check }, secretKey, {
      algorithm: 'RS256',
    });
  }

  return {
    status,
    message,
    token,
  };
};
