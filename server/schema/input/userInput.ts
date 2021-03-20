import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateNewUserInput {
  @Field(() => String, { nullable: false })
  username: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;

  @Field(() => String, { nullable: true })
  confirm_password: string;
}

@InputType()
export class resetUserInput {
  @Field(() => String, { nullable: false })
  token: string;
}

@InputType()
export class loginUserInput {
  @Field(() => String, { nullable: false })
  token: string;

  @Field(() => String, { nullable: false })
  password: string;
}
