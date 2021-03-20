import { Field, Int, ObjectType } from 'type-graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LocationEntity } from './LocationEntity';

@ObjectType()
@Entity('accounts')
export class AccountsEntity {
  @Field(() => String, { nullable: true })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String, { nullable: true })
  @Column('binary', { nullable: true })
  avatar: string;

  @Field(() => Int, { nullable: true })
  @Column('tinyint', { nullable: true })
  pin: number;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true, length: 225 })
  phone: string;

  @Field(() => Date, { nullable: true })
  @Column('timestamp', { nullable: true })
  phone_verified_at: Date;

  @Field(() => Date, { nullable: true })
  @Column('timestamp', { nullable: true })
  createAt: Date;

  @Field(() => Date, { nullable: true })
  @Column('timestamp', { nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @BeforeUpdate()
  async retrieveUpdateAt() {
    this.updateAt = new Date();
  }

  @Field(() => LocationEntity)
  @OneToOne(() => LocationEntity)
  @JoinColumn()
  location: LocationEntity;

  @BeforeInsert()
  async insertRelationLocation() {
    const location = new LocationEntity();
    location.createAt = new Date();
    location.updateAt = new Date();
    return location;
  }
}
