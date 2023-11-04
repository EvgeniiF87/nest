import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateInterestingCollectionInput {
  @Field()
  @IsString({ message: 'поле должно быть строкой' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  title: string;

  @Field()
  @IsString({ message: 'поле должно быть строкой' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  img?: string;

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

  @Field({ defaultValue: 0, nullable: true })
  @IsInt({ message: 'поле должно быть целым числом' })
  priorities?: number;
}
