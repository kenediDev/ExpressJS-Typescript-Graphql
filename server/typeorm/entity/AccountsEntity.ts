import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountryEntity } from './CountryEntity';
import { test } from '../../internal/__test_config__';

@ObjectType()
@Entity('accounts')
export class AccountsEntity extends BaseEntity {
  @Field(() => String, { nullable: true })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true, length: 225 })
  first_name: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true, length: 225 })
  last_name: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true, length: 225 })
  avatar: string;

  @Field(() => CountryEntity, { nullable: true })
  @OneToOne(() => CountryEntity, (country) => country.id)
  @JoinColumn()
  location: CountryEntity;

  @Field(() => Date, { nullable: true })
  @Column(test ? 'datetime' : 'timestamp', { nullable: false })
  createAt: Date;

  @BeforeInsert()
  async generateCreateAt() {
    this.createAt = new Date();
  }
}
