import { CreateInterestingCollectionSelectionInput } from './create-interesting_collection_selections.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInterestingCollectionSelectionInput extends PartialType(
  CreateInterestingCollectionSelectionInput,
) {
  @Field(() => Int)
  id: number;
}
