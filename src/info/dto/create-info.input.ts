import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

@InputType()
export class CreateInfoInput {
  @Field({ nullable: true })
  @IsString({ message: 'поле должно быть строкой' })
  adress?: string;

  @Field({ nullable: true })
  @IsString({ message: 'поле должно быть строкой' })
  metro?: string;

  @Field({ nullable: true })
  @IsString({ message: 'поле должно быть строкой' })
  time_from?: string;

  @Field({ nullable: true })
  @IsString({ message: 'поле должно быть строкой' })
  time_to?: string;

  @Field({ nullable: true })
  @IsPhoneNumber('RU', { message: 'не валидный номер телефона' })
  phone?: string;

  @Field({ defaultValue: false, nullable: true })
  @IsBoolean({ message: 'поле должно быть булево значение' })
  call_back?: boolean;

  @Field({ nullable: true })
  @IsString({ message: 'поле должно быть строкой' })
  @IsUrl({}, { message: 'не валидный url' })
  site?: string;

  @Field({ nullable: true })
  @IsString({ message: 'поле должно быть строкой' })
  @IsUrl({}, { message: 'не валидный url' })
  social?: string;

  @Field({ nullable: true })
  @IsString({ message: 'поле должно быть строкой' })
  longitude?: string;

  @Field({ nullable: true })
  @IsString({ message: 'поле должно быть строкой' })
  latitude?: string;

  @Field(() => Int, { nullable: true })
  @IsInt({ message: 'поле должно быть целым числом' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  placeId?: number;

  @Field(() => Int, { nullable: true })
  @IsInt({ message: 'поле должно быть целым числом' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  eventId?: number;
}
