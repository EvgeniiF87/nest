import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString({ message: 'поле должно быть строкой' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  name: string;

  @Field()
  @IsEmail({}, { message: 'не валидный email' })
  @IsString({ message: 'поле должно быть строкой' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  email: string;

  @Field({ nullable: true })
  @IsPhoneNumber('RU', { message: 'не валидный номер телефона' })
  phone?: string;

  @Field()
  @IsString({ message: 'поле должно быть строкой' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  @Length(8, 18, { message: 'длина пароля должна быть от 8 до 18 символов' })
  password: string;

  @Field({ nullable: true })
  @IsString({ message: 'поле должно быть строкой' })
  avatar: string;

  @Field(() => Int, { nullable: true })
  roleId: number;
}
