import { CreateEventPlaceCostOptionInput } from './create-event_place_cost_option.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEventPlaceCostOptionInput extends PartialType(CreateEventPlaceCostOptionInput) {
  @Field(() => Int)
  id: number;
}
