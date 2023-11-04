import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateInterestingCategoryInput {
  @Field()
  @IsString({ message: 'поле должно быть строкой' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  name: string;
}
