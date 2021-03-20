import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { AccountsEntity } from './AccountsEntity';

@ObjectType()
@Entity('user')
export class UserEntity extends BaseEntity {
  @Field(() => String, { nullable: true })
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
  @Column('varchar', { nullable: false })
  password: string;

  @Field(() => AccountsEntity)
  @OneToOne(() => AccountsEntity)
  @JoinColumn()
  accounts: AccountsEntity;

  @BeforeInsert()
  async generateRelationAccounts() {
    const accounts = new AccountsEntity();
    accounts.createAt = new Date();
    accounts.updateAt = new Date();
    return accounts;
  }

  @BeforeInsert()
  async generateBcrypt() {
    this.password = await bcrypt.hash(
      this.password,
      Math.floor((Math.random() + 1) * Math.random())
    );
  }

  @BeforeInsert()
  async generateCreateAt() {
    this.createAt = new Date();
  }

  @BeforeInsert()
  async generateUpdateAt() {
    this.updateAt = new Date();
  }

  @BeforeUpdate()
  async retrieveUpdateAt() {
    this.updateAt = new Date();
  }

  async verifyHash(args: string) {
    const hash = await bcrypt.compare(args, this.password);
    return hash;
  }
}
