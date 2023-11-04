import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateInterestingCategorySelectInput {
  @Field(() => Int)
  @IsInt({ message: 'поле должно быть целым числом' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  interestingId: number;

  @Field(() => Int)
  @IsInt({ message: 'поле должно быть целым числом' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  categoryId: number;
}
