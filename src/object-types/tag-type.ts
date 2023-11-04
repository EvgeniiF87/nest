import { ObjectType, PickType } from '@nestjs/graphql';
import { TagEntity } from 'src/tag/entities/tag.entity';

@ObjectType()
export class TagType extends PickType(TagEntity, ['id', 'name']) {}
