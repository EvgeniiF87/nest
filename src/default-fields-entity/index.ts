import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export abstract class DefaultFieldsEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  desc: string;

  @Field(() => Int, { nullable: true })
  @Column({ default: 0, nullable: true })
  views: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  preview?: string;

  @Field({ defaultValue: true })
  @Column({ default: true })
  publish: boolean;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  existTimeStart?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  existTimeEnd?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  whenStartToShow?: Date;
}
