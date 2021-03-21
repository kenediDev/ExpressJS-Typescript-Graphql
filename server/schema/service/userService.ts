import { transpoter } from '../../utils/transpoter';
import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserEntity } from '../../typeorm/entity/UserEntity';
import {
  CreateNewUserInput,
  loginUserInput,
  resetUserInput,
} from '../input/userInput';
import { UserQueryResponse } from '../query/userQuery';
import dotenv from 'dotenv';
import { authenticateJWT } from '../../utils/authenticate';
import { StatusNotificationGRAPHQL } from '../types/interface';

dotenv.config();

@Service()
@EntityRepository(UserEntity)
export class UserEntityRepository extends Repository<UserEntity> {
  async getAll(): Promise<UserQueryResponse> {
    return {
      statusCode: 200,
      status: 'success',
      results: await this.createQueryBuilder().getMany(),
    };
  }

  async getDetail(options: string): Promise<UserQueryResponse> {
    let statusCode: number,
      status: StatusNotificationGRAPHQL,
      message: string,
      data: UserEntity;
    data = await this.findOne({ where: { id: options } });
    statusCode = 404;
    status = 'error';
    message = 'Accounts not found';
    if (data) {
      statusCode = 200;
      status = 'success';
      message = '';
    }
    return {
      statusCode,
      status,
      message,
      data,
    };
  }

  async createNewUser(options: CreateNewUserInput): Promise<UserQueryResponse> {
    let status: StatusNotificationGRAPHQL, statusCode: number, message: string;
    message = 'Username or email already exists, please choose another.';
    statusCode = 400;
    status = 'error';
    const check = await this.findOne({
      where: [
        {
          username: options.username,
        },
        {
          email: options.email,
        },
      ],
    });
    const match_password = options.password !== options.confirm_password;
    if (match_password) {
      message = "Password don't match";
    }

    if (!check && !match_password) {
      message = 'Accounts has been created';
      statusCode = 201;
      status = 'success';
      const create = new UserEntity();
      create.username = options.username;
      create.email = options.email;
      create.password = options.password;
      //   Create Accounts
      create.accounts = await create.generateRelationAccounts();
      //   Create Location
      create.accounts.location = await create.accounts.insertRelationLocation();
      await this.manager.save(create.accounts.location);
      await this.manager.save(create.accounts);
      await this.manager.save(create);
    }
    return {
      status,
      statusCode,
      message,
    };
  }
  async resetUser(options: resetUserInput): Promise<UserQueryResponse> {
    let message: string, statusCode: number, status: StatusNotificationGRAPHQL;
    message = 'Accounts not found, please check again';
    statusCode = 404;
    status = 'error';
    const check = await this.findOne({
      where: [
        {
          username: options.token,
        },
        {
          email: options.token,
        },
        {
          accounts: {
            phone: options.token,
          },
        },
      ],
    });
    if (check) {
      message =
        'Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.';
      statusCode = 200;
      status = 'success';
      await transpoter(check.email);
    }
    return {
      message,
      status,
      statusCode,
    };
  }
}

@Service()
export class UserServiceResponse {
  constructor(@InjectRepository() private repo: UserEntityRepository) {}

  async getAll(): Promise<UserQueryResponse> {
    return this.repo.getAll();
  }

  async getDetail(options: string): Promise<UserQueryResponse> {
    return this.repo.getDetail(options);
  }

  async createNewUser(options: CreateNewUserInput): Promise<UserQueryResponse> {
    return this.repo.createNewUser(options);
  }

  async resetUser(options: resetUserInput): Promise<UserQueryResponse> {
    return this.repo.resetUser(options);
  }

  async login(options: loginUserInput): Promise<UserQueryResponse> {
    return authenticateJWT(options, this.repo);
  }
}
