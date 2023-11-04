import { ObjectType, Field, ID } from '@nestjs/graphql';
import { InterestingCategorySelectEntity } from 'src/interesting_category_select/entities/interesting_category_select.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('interesting_categories')
export class InterestingCategoryEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [InterestingCategorySelectEntity])
  @OneToMany(
    () => InterestingCategorySelectEntity,
    (ineresting) => ineresting.category,
  )
  ineresting: InterestingCategorySelectEntity[];
}
