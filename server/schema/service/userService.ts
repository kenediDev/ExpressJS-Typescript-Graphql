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

dotenv.config();

@Service()
@EntityRepository(UserEntity)
export class UserEntityRepository extends Repository<UserEntity> {
  async getAll(): Promise<UserQueryResponse> {
    return {
      status: 200,
      results: await this.createQueryBuilder().getMany(),
    };
  }

  async getDetail(options: string): Promise<UserQueryResponse> {
    let status: number, message: string, data: UserEntity;
    data = await this.findOne({ where: { id: options } });
    status = 404;
    message = 'Accounts not found';
    if (data) {
      status = 200;
      message = '';
    }
    return {
      status,
      message,
      data,
    };
  }

  async createNewUser(options: CreateNewUserInput): Promise<UserQueryResponse> {
    let status: number, message: string;
    message = 'Username or email already exists, please choose another.';
    status = 400;
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
      status = 400;
    }

    if (!check) {
      message = 'Accounts has been created';
      status = 201;
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
      message,
    };
  }
  async resetUser(options: resetUserInput): Promise<UserQueryResponse> {
    let message: string, status: number;
    message = 'Accounts not found, please check again';
    status = 404;
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
      status = 200;
      await transpoter(check.email);
    }
    return {
      message,
      status,
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
