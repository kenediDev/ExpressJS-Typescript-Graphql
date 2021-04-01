import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { test } from '../../internal/__test_config__';

@ObjectType()
@Entity('country')
export class CountryEntity extends BaseEntity {
  @Field(() => String, { nullable: true })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true, length: 225 })
  country: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true, length: 225 })
  province: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true, length: 225 })
  city: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  address: string;

  @Field(() => Date, { nullable: true })
  @Column(test ? 'datetime' : 'timestamp', { nullable: false })
  createAt: Date;

  @BeforeInsert()
  async generateCreateAt() {
    this.createAt = new Date();
  }
}
