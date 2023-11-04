import { CreateInfoInput } from './create-info.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInfoInput extends PartialType(CreateInfoInput) {
  @Field(() => Int)
  id: number;
}
