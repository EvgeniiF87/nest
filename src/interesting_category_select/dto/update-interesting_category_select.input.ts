import { CreateInterestingCategorySelectInput } from './create-interesting_category_select.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInterestingCategorySelectInput extends PartialType(
  CreateInterestingCategorySelectInput,
) {
  @Field(() => Int)
  id: number;
}
