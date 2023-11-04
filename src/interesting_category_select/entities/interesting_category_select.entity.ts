import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { InterestingCategoryEntity } from 'src/interesting_categories/entities/interesting_category.entity';
import { InterestingCollectionEntity } from 'src/interesting_collection/entities/interesting_collection.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('interesting_category_select')
export class InterestingCategorySelectEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [InterestingCollectionEntity])
  @ManyToOne(
    () => InterestingCollectionEntity,
    (interesting) => interesting.category,
  )
  interesting: InterestingCollectionEntity;

  @Field(() => Int)
  @Column()
  interestingId: number;

  @Field(() => [InterestingCategoryEntity])
  @ManyToOne(() => InterestingCategoryEntity, (category) => category.ineresting)
  category: InterestingCollectionEntity;

  @Field(() => Int)
  @Column()
  categoryId: number;
}
