import { UserEntity } from '../typeorm/entity/UserEntity';
import jwt from 'jsonwebtoken';
import { secretKey } from './key';
import { Repository } from 'typeorm';
import { loginUserInput } from '../schema/input/userInput';
import { UserQueryResponse } from '../schema/query/userQuery';
import { StatusNotificationGRAPHQL } from '../schema/types/interface';
import bcrypt from 'bcrypt';

export const authenticateJWT = async (
  options: loginUserInput,
  con: Repository<UserEntity>
): Promise<UserQueryResponse> => {
  let message: string,
    statusCode: number,
    status: StatusNotificationGRAPHQL,
    token: any;
  message = 'Inccorect Username or Password';
  statusCode = 400;
  status = 'error';
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
  if (check) {
    const hash = await bcrypt.compareSync(options.password, check.password);
    if (!hash) {
      statusCode = 200;
      status = 'success';
      message = '';
      token = await jwt.sign({ user: check }, secretKey, {
        algorithm: 'RS256',
      });
    }
  }

  return {
    status,
    statusCode,
    message,
    token,
  };
};
