import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { MiddlewareGraphql } from '../../middleware/middlewareGraphql';
import {
  CreateNewUserInput,
  LoginUserInput,
  UpdateUserInput,
} from '../input/userInput';
import { UserQueryResponse } from '../query/queryUser';
import { UserRepository } from '../service/userService';

@Service()
@Resolver()
export class UserResolver {
  constructor(@InjectRepository() public service: UserRepository) {}

  @Mutation(() => UserQueryResponse)
  async createUser(
    @Arg('options', { validate: true }) options: CreateNewUserInput
  ): Promise<UserQueryResponse> {
    return this.service.recordUser(options);
  }

  @Authorized()
  @Mutation(() => UserQueryResponse)
  async updateUser(
    @Arg('options') options: UpdateUserInput,
    @Ctx() context: MiddlewareGraphql
  ): Promise<UserQueryResponse> {
    return this.service.updateUser(options, context.user.user.id);
  }

  @Mutation(() => UserQueryResponse)
  async loginUser(
    @Arg('options', { validate: true }) options: LoginUserInput
  ): Promise<UserQueryResponse> {
    return this.service.loginUser(options);
  }

  @Authorized()
  @Query(() => UserQueryResponse)
  async getAllUser(): Promise<UserQueryResponse> {
    return this.service.getall();
  }

  @Authorized()
  @Query(() => UserQueryResponse)
  async getDetail(@Arg('options') options: string): Promise<UserQueryResponse> {
    return this.service.getDetail(options);
  }

  @Authorized()
  @Query(() => UserQueryResponse)
  async getMe(@Ctx() context: MiddlewareGraphql): Promise<UserQueryResponse> {
    return this.service.getMe(context.user.user.id);
  }
}
