import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CostOptionType {
  @Field()
  name: string;

  @Field()
  price: number;
}
