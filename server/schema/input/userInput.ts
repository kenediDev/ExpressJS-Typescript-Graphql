import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateNewUserInput {
  @Field(() => String, { nullable: false })
  @MinLength(2)
  @MaxLength(22)
  username: string;

  @Field(() => String, { nullable: false })
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: false })
  @MinLength(6)
  password: string;

  @Field(() => String, { nullable: false })
  @MinLength(6)
  confirm_password: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: false })
  @MinLength(2)
  first_name: string;

  @Field(() => String, { nullable: true })
  last_name: string;
}

@InputType()
export class LoginUserInput {
  @Field(() => String, { nullable: false })
  username: string;

  @Field(() => String, { nullable: false })
  password: string;
}
