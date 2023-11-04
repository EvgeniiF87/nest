import { InputType, Field } from '@nestjs/graphql';
import { PlaceDirections } from '../directions';
import { RequestInput } from 'src/request/request-input';

@InputType()
export class RequestPlace extends RequestInput {
  @Field(() => PlaceDirections, { nullable: true })
  direction?: PlaceDirections;
}
