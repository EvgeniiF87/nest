import { CreateInterestingCollectionInput } from './create-interesting_collection.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInterestingCollectionInput extends PartialType(CreateInterestingCollectionInput) {
  @Field(() => Int)
  id: number;
}
