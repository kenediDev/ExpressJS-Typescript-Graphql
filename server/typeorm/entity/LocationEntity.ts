import { Field, ObjectType } from 'type-graphql';
import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('location')
export class LocationEntity {
  @Field(() => String, { nullable: true })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true })
  country: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true })
  province: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true })
  city: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  address: string;

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
}
