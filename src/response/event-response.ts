import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DefaultFieldsEntity } from 'src/default-fields-entity';
import { CostOptionType } from 'src/object-types/cost-option-type';
import { InfoType } from 'src/object-types/info-type';
import { TagType } from 'src/object-types/tag-type';

@ObjectType()
export default class EventResponse extends DefaultFieldsEntity {
  @Field()
  recommendation: boolean;

  @Field()
  categry: string;

  @Field()
  direction: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  cityId: number;

  @Field(() => InfoType)
  info: InfoType;

  @Field(() => [String])
  images: [string];

  @Field(() => [TagType])
  tags: TagType[];

  @Field(() => [CostOptionType])
  costOptions: CostOptionType[];
}
