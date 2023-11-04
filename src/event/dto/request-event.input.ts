import { InputType, Field } from '@nestjs/graphql';
import { EventDirections } from '../directions';
import { RequestInput } from 'src/request/request-input';

@InputType()
export class RequestEvent extends RequestInput {
  @Field(() => EventDirections, { nullable: true })
  direction?: EventDirections;
}
