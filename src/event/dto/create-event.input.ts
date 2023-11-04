import { InputType, Field, Int } from '@nestjs/graphql';
import { EventDirections } from '../directions';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

@InputType()
export class CreateEventInput {
  @Field()
  @IsString({ message: 'поле должно быть строкой' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  title: string;

  @Field()
  @IsString({ message: 'поле должно быть строкой' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  desc: string;

  @Field()
  @IsString({ message: 'поле должно быть строкой' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  preview?: string;

  @Field({ defaultValue: true, nullable: true })
  @IsBoolean({ message: 'поле должно быть булево значение' })
  publish?: boolean;

  @Field(() => Date, { nullable: true })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  @IsDate({ message: 'поле должно быть датой в формате ГОД:МЕСЯЦ:ДЕНЬ' })
  existTimeStart?: Date;

  @Field(() => Date, { nullable: true })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  @IsDate({ message: 'поле должно быть датой в формате ГОД:МЕСЯЦ:ДЕНЬ' })
  existTimeEnd?: Date;

  @Field(() => Date, { nullable: true })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  @IsDate({ message: 'поле должно быть датой в формате ГОД:МЕСЯЦ:ДЕНЬ' })
  whenStartToShow?: Date;

  @Field({ defaultValue: false, nullable: true })
  @IsBoolean({ message: 'поле должно быть булево значение' })
  recommendation?: boolean;

  @Field(() => EventDirections)
  @IsEnum(EventDirections, {
    message: 'поле должно соответствовать значению из типа enum',
  })
  direction: EventDirections;

  @Field(() => Int)
  @IsInt({ message: 'поле должно быть целым числом' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  userId: number;
}
