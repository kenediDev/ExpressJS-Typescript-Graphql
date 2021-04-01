import { Service } from 'typedi';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { InjectConnection } from 'typeorm-typedi-extensions';
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
  constructor(@InjectConnection() private connection: Connection) {
    super();
  }

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

  async updateUser(
    options: UpdateUserInput,
    id: string
  ): Promise<UserQueryResponse> {
    let status: Status = 'Success',
      statusCode: number = 200,
      message: string = 'Profile has been updated';
    const check = await this.findOne({ where: { id } });
    if (!check) {
      throw new Error('Accounts not found');
    }
    await this.createQueryBuilder()
      .update()
      .set({
        accounts: {
          first_name: options.first_name,
          last_name: options.last_name,
        },
      })
      .where('user.id=:id', { id })
      .execute();
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
    const check = await this.findOneOrFail({
      where: { username: options.username },
    });
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

  async getall(): Promise<UserQueryResponse> {
    const results = await this.connection
      .createQueryBuilder(UserEntity, 'user')
      .leftJoinAndSelect('user.accounts', 'accounts')
      .leftJoinAndSelect('accounts.location', 'country')
      .getMany();
    return {
      status: 'Success',
      statusCode: 200,
      results,
    };
  }

  async getDetail(options: string) {
    let status: Status = 'Success',
      statusCode: number = 200;
    const filter = await this.connection
      .createQueryBuilder(UserEntity, 'user')
      .where('user.id=:id', { id: options })
      .leftJoinAndSelect('user.accounts', 'accounts')
      .leftJoinAndSelect('accounts.location', 'country')
      .getOne();

    if (!filter) {
      throw new Error('Accounts not found');
    }
    return {
      status,
      statusCode,
      user: filter,
    };
  }

  async getMe(id: string): Promise<UserQueryResponse> {
    let status: Status = 'Success',
      statusCode: number = 200;
    const user = await this.connection
      .createQueryBuilder(UserEntity, 'user')
      .where('user.id=:id', {
        id,
      })
      .leftJoinAndSelect('user.accounts', 'accounts')
      .leftJoinAndSelect('accounts.location', 'country')
      .getOne();
    if (!user) {
      throw new Error('Accounts not found');
    }
    return {
      status,
      statusCode,
      user: user,
    };
  }
}
