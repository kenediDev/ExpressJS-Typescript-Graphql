import { Field, Int, ObjectType } from 'type-graphql';
import { UserEntity } from '../../typeorm/entity/UserEntity';
import { Status } from '../../types/status';

@ObjectType()
export class UserQueryResponse {
  @Field(() => UserEntity, { nullable: true })
  user?: UserEntity;

  @Field(() => [UserEntity], { nullable: true })
  results?: UserEntity[];

  @Field(() => String, { nullable: false })
  status: Status;

  @Field(() => Int, { nullable: false })
  statusCode: number;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String, { nullable: true })
  token?: string;
}
