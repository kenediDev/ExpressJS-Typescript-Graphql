import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { test } from '../../internal/__test_config__';

@ObjectType()
@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: false, unique: true, length: 225 })
  username: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: false, unique: true, length: 225 })
  email: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true, length: 225 })
  first_name: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true, length: 225 })
  last_name: string;

  @Field(() => Date, { nullable: true })
  @Column(test ? 'datetime' : 'timestamp', { nullable: true })
  createAt: Date;

  @Field(() => Date, { nullable: true })
  @Column(test ? 'datetime' : 'timestamp', {
    nullable: false,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: false, length: 225 })
  password: string;

  @BeforeInsert()
  async generateTimes() {
    this.createAt = new Date();
    this.updateAt = new Date();
    this.password = await bcrypt.hash(
      this.password,
      Math.floor((Math.random() + 1) * Math.random())
    );
  }

  async verifyPassword(options) {
    return bcrypt.compareSync(options, this.password);
  }
}
