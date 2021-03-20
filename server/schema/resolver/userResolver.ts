import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import {
  CreateNewUserInput,
  loginUserInput,
  resetUserInput,
} from '../input/userInput';
import { UserQueryResponse } from '../query/userQuery';
import { UserServiceResponse } from '../service/userService';

@Service()
@Resolver()
export class UserResolver {
  constructor(private service: UserServiceResponse) {}

  @Query(() => UserQueryResponse)
  async getAll(): Promise<UserQueryResponse> {
    return this.service.getAll();
  }

  @Query(() => UserQueryResponse)
  async getDetail(@Arg('options') options: string): Promise<UserQueryResponse> {
    return this.service.getDetail(options);
  }

  @Mutation(() => UserQueryResponse)
  async createNewuser(
    @Arg('options') options: CreateNewUserInput
  ): Promise<UserQueryResponse> {
    return this.service.createNewUser(options);
  }

  @Mutation(() => UserQueryResponse)
  async resetUser(
    @Arg('options') options: resetUserInput
  ): Promise<UserQueryResponse> {
    return this.service.resetUser(options);
  }

  @Mutation(() => UserQueryResponse)
  async login(
    @Arg('options') options: loginUserInput
  ): Promise<UserQueryResponse> {
    return this.service.login(options);
  }
}
