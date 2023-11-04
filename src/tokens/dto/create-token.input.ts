import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTokenInput {
  @Field(() => Date)
  expire: Date;

  @Field()
  refresh_token: string;

  @Field(() => Int)
  userId: number;
}
