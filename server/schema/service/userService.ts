import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserEntity } from '../../typeorm/entity/UserEntity';
import { Status } from '../../types/status';
import {
  CreateNewUserInput,
  LoginUserInput,
  UpdateUserInput,
} from '../input/userInput';
import { UserQueryResponse } from '../query/queryUser';
import { ValidatorError } from '../utils/validatorError';
import jwt from 'jsonwebtoken';
import fs from 'fs';

@Service()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async recordUser(options: CreateNewUserInput): Promise<UserQueryResponse> {
    let status: Status = 'Failure',
      statusCode: number = 400,
      message: string =
        'Username or email already exists, please choose another';
    const check = await this.findOne({
      where: [{ username: options.username }, { email: options.email }],
    });
    const match_hash = options.password !== options.confirm_password;
    if (match_hash) {
      message = "Password don't match";
      throw new ValidatorError(message);
    } else if (check) {
      throw new ValidatorError(message);
    }
    const create = new UserEntity();
    create.username = options.username;
    create.email = options.email;
    create.password = options.password;
    await this.save(create);
    message = 'Accounts has been created';
    status = 'Success';
    statusCode = 201;
    return {
      status,
      statusCode,
      message,
    };
  }

  async updateUser(options: UpdateUserInput): Promise<UserQueryResponse> {
    let status: Status = 'Success',
      statusCode: number = 200,
      message: string = 'Profile has been updated';
    const check = await this.findOne({ where: { id: options.id } });
    check.first_name = options.first_name;
    check.last_name = options.last_name;
    await this.save(check);
    return {
      status,
      statusCode,
      message,
    };
  }

  async loginUser(options: LoginUserInput): Promise<UserQueryResponse> {
    let status: Status = 'Failure',
      statusCode: number = 400,
      message: string = 'Inccorect username or password',
      token: string;
    const check = await this.findOne({ where: { username: options.username } });
    const check_hash = await check.verifyPassword(options.password);
    if (check && check_hash) {
      token = jwt.sign(
        { user: check },
        fs.readFileSync('jwtRS256.key', 'utf-8'),
        { algorithm: 'RS256' }
      );
      status = 'Success';
      statusCode = 200;
    } else {
      throw new ValidatorError(message);
    }
    return {
      status,
      statusCode,
      token,
    };
  }
}

@Service()
export class UserService {
  constructor(@InjectRepository() public repo: UserRepository) {}

  async createUser(options: CreateNewUserInput): Promise<UserQueryResponse> {
    return this.repo.recordUser(options);
  }

  async updateUser(options: UpdateUserInput): Promise<UserQueryResponse> {
    return this.repo.updateUser(options);
  }

  async loginUser(options: LoginUserInput): Promise<UserQueryResponse> {
    return this.repo.loginUser(options);
  }
}
