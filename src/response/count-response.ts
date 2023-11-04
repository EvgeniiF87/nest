import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class CountResponse {
  @Field()
  count: number;
}
