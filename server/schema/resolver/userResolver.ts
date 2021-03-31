import { Arg, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import {
  CreateNewUserInput,
  LoginUserInput,
  UpdateUserInput,
} from '../input/userInput';
import { UserQueryResponse } from '../query/queryUser';
import { UserService } from '../service/userService';

@Service()
@Resolver()
export class UserResolver {
  constructor(public service: UserService) {}

  @Mutation(() => UserQueryResponse)
  async createUser(
    @Arg('options', { validate: true }) options: CreateNewUserInput
  ): Promise<UserQueryResponse> {
    return this.service.createUser(options);
  }
  @Mutation(() => UserQueryResponse)
  async updateUser(
    @Arg('options') options: UpdateUserInput
  ): Promise<UserQueryResponse> {
    return this.service.updateUser(options);
  }
  @Mutation(() => UserQueryResponse)
  async loginUser(
    @Arg('options', { validate: true }) options: LoginUserInput
  ): Promise<UserQueryResponse> {
    return this.service.loginUser(options);
  }
}
