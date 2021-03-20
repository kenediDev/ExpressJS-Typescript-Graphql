import { Field, ObjectType } from 'type-graphql';
import { UserEntity } from '../../typeorm/entity/UserEntity';

@ObjectType()
export class UserQueryResponse {
  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String, { nullable: true })
  status: number;

  @Field(() => [UserEntity], { nullable: true })
  results?: UserEntity[];

  @Field(() => UserEntity, { nullable: true })
  data?: UserEntity;

  @Field(() => String, { nullable: true })
  token?: string;
}
