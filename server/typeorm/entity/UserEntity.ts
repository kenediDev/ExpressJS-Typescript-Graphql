import { Field, ObjectType } from 'type-graphql';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';

@ObjectType()
@Entity('user')
export class UserEntity {
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
  @Column('timestamp', { nullable: true })
  createAt: Date;

  @Field(() => Date, { nullable: true })
  @Column('timestamp', { nullable: false, onUpdate: 'CURRENT_TIMESTAMP' })
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
}
