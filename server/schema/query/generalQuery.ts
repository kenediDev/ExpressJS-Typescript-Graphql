import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserQuery {
  @Field(() => String)
  username: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  first_name: string;
  @Field(() => String)
  last_name: string;
  @Field(() => String)
  password: string;
  @Field(() => String)
  old_password: string;
  @Field(() => String)
  confirm_password: string;
  @Field(() => String)
  usernameOr: string;
  @Field(() => String)
  country: string;
  @Field(() => String)
  province: string;
  @Field(() => String)
  city: string;
  @Field(() => String)
  address: string;
  @Field(() => String)
  avatar: string;
  @Field(() => String)
  pin: string;
  @Field(() => String)
  old_pin: string;
  @Field(() => String)
  confirm_pin: string;
  @Field(() => String)
  phone: string;
  @Field(() => String)
  phone_verified_at: string;
}

@ObjectType()
export class GeneralQuery {
  @Field(() => String, { nullable: false })
  login: string;
  @Field(() => String, { nullable: false })
  register: string;
  @Field(() => String, { nullable: false })
  reset: string;
  @Field(() => String, { nullable: false })
  title_login: string;
  @Field(() => String, { nullable: false })
  title_register: string;
  @Field(() => String, { nullable: false })
  child_title_register: string;
  @Field(() => String, { nullable: false })
  title_forgotted: string;
  @Field(() => String, { nullable: false })
  child_title_forgotted: string;
  @Field(() => String, { nullable: false })
  create_new: string;
  @Field(() => String, { nullable: false })
  forgotted: string;
  @Field(() => String, { nullable: false })
  signin: string;
  @Field(() => String, { nullable: false })
  signup: string;
  @Field(() => String, { nullable: true })
  category: string;
  @Field(() => String, { nullable: true })
  search: string;
  @Field(() => String, { nullable: true })
  basket: string;
  @Field(() => String, { nullable: true })
  notification: string;
  @Field(() => String, { nullable: true })
  message: string;
  @Field(() => String, { nullable: true })
  already: string;
}

@ObjectType()
export class GeneralQueryResponse {
  @Field(() => UserQuery, { nullable: true })
  user: UserQuery;

  @Field(() => GeneralQuery, { nullable: true })
  general: GeneralQuery;
}
