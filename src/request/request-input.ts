import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class RequestInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  desc?: string;

  @Field({ nullable: true })
  tagId?: number;

  @Field({ nullable: true })
  cityId?: number;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;
}
