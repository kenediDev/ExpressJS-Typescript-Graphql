import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'General Field' })
class GeneralQuery {
  @Field(() => String)
  signin: string;
  @Field(() => String)
  signup: string;
  @Field(() => String)
  login: string;
  @Field(() => String)
  register: string;
  @Field(() => String)
  forgotted: string;
  @Field(() => String)
  reset: string;
  @Field(() => String)
  already: string;
  @Field(() => String)
  create_new: string;
  @Field(() => String)
  login_title: string;
  @Field(() => String)
  register_title: string;
  @Field(() => String)
  child_register_title: string;
  @Field(() => String)
  forgotted_title: string;
  @Field(() => String)
  child_forgotted_title: string;
}

@ObjectType({ description: 'User Field' })
export class UserQuery {
  @Field(() => String)
  username: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  avatar: string;
  @Field(() => String)
  first_name: string;
  @Field(() => String)
  last_name: string;
  @Field(() => String)
  country: string;
  @Field(() => String)
  province: string;
  @Field(() => String)
  address: string;
  @Field(() => String)
  city: string;
  @Field(() => String)
  password: string;
  @Field(() => String)
  old_password: string;
  @Field(() => String)
  confirm_password: string;
}

@ObjectType({ description: 'Group' })
export class GeneralQueryResponse {
  @Field(() => UserQuery)
  user: UserQuery;

  @Field(() => GeneralQuery)
  general: GeneralQuery;
}
