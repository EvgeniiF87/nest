import { InputType, Field } from '@nestjs/graphql';
import { Roles } from '../role-types';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field(() => Roles)
  @IsString({ message: 'поле должно быть строкой' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  name: string;
}
