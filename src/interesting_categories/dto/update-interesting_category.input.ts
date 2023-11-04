import { CreateInterestingCategoryInput } from './create-interesting_category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInterestingCategoryInput extends PartialType(
  CreateInterestingCategoryInput,
) {
  @Field(() => Int)
  id: number;
}
