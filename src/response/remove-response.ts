import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class RemoveResponse {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field()
  message: string;

  @Field()
  status: string;
}
