import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateTagInput {
  @Field()
  @IsString({ message: 'поле должно быть строкой!' })
  @MinLength(3, { message: 'должно быть больше 3 символов' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  name: string;
}
