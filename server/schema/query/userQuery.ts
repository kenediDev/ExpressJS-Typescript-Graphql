import { Field, Int, ObjectType } from 'type-graphql';
import { StatusNotification } from '../../../src/service/completeService';
import { UserEntity } from '../../typeorm/entity/UserEntity';

@ObjectType()
export class UserQueryResponse {
  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => Int, { nullable: true })
  statusCode: number;

  @Field(() => String, { nullable: true })
  status: StatusNotification;

  @Field(() => [UserEntity], { nullable: true })
  results?: UserEntity[];

  @Field(() => UserEntity, { nullable: true })
  data?: UserEntity;

  @Field(() => String, { nullable: true })
  token?: string;
}
