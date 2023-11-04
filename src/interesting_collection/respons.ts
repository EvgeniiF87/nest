import { Field, Int, ObjectType } from '@nestjs/graphql';
import { InterestingCollectionEntity } from './entities/interesting_collection.entity';

@ObjectType()
export default class InterestingCollectionsAndCount {
  @Field(() => [InterestingCollectionEntity])
  collections: InterestingCollectionEntity[];

  @Field(() => Int)
  count: number;
}
