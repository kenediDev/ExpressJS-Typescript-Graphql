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
import { test } from '../../internal/__test_config__';
import { AccountsEntity } from './AccountsEntity';
import { CountryEntity } from './CountryEntity';

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

  @Field(() => AccountsEntity, { nullable: true })
  @OneToOne(() => AccountsEntity, (accounts) => accounts.id)
  @JoinColumn()
  accounts: AccountsEntity;

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
  async generateCreateAt() {
    this.createAt = new Date();
  }

  @BeforeInsert()
  async generateUpdateAt() {
    this.updateAt = new Date();
  }

  @BeforeInsert()
  async generatePasword() {
    this.password = await bcrypt.hash(
      this.password,
      Math.floor((Math.random() + 1) * Math.random())
    );
  }

  @BeforeUpdate()
  async retrieveUpdateAt() {
    this.updateAt = new Date();
  }

  @BeforeInsert()
  async generateAccounts() {
    const country = new CountryEntity();
    await country.save();
    const accounts = new AccountsEntity();
    accounts.location = country;
    await accounts.save();
    this.accounts = accounts;
  }

  async verifyPassword(options) {
    return bcrypt.compareSync(options, this.password);
  }
}
