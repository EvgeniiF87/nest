import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateEventPlaceCostOptionInput {
  @Field(() => Int, { nullable: true })
  @IsInt({ message: 'поле должно быть целым числом' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  eventId?: number;

  @Field(() => Int, { nullable: true })
  @IsInt({ message: 'поле должно быть целым числом' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  placeId?: number;

  @Field(() => Int)
  @IsInt({ message: 'поле должно быть целым числом' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  costOptionId: number;

  @Field({ defaultValue: 'бесплатно' })
  @IsString({ message: 'поле должно быть строкой' })
  price: string;
}
