import { CreateEventPlaceTagInput } from './create-event_place_tag.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEventPlaceTagInput extends PartialType(CreateEventPlaceTagInput) {
  @Field(() => Int)
  id: number;
}
