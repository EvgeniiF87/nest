import { ObjectType, Field, ID } from '@nestjs/graphql';
import { InterestingCategorySelectEntity } from 'src/interesting_category_select/entities/interesting_category_select.entity';
import { InterestingCollectionSelectionEntity } from 'src/interesting_collection_selections/entities/interesting_collection_selections.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('interesting_collections')
export class InterestingCollectionEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  img?: string;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  views?: number;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  priorities?: number;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  existTimeStart?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  existTimeEnd?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  whenStartToShow?: Date;

  @Field(() => [InterestingCollectionSelectionEntity])
  @OneToMany(
    () => InterestingCollectionSelectionEntity,
    (collection) => collection.interesting,
  )
  collection: InterestingCollectionSelectionEntity[];

  @Field(() => [InterestingCategorySelectEntity])
  @OneToMany(
    () => InterestingCategorySelectEntity,
    (category) => category.interesting,
  )
  category: InterestingCategorySelectEntity[];
  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
