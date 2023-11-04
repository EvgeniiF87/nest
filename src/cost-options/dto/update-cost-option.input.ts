import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateCostOptionInput } from './create-cost-option.input';

@InputType()
export class UpdateCostOptionInput extends PartialType(CreateCostOptionInput) {
  @Field(() => ID)
  id: number;
}
