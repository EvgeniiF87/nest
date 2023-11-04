import { ObjectType, PickType } from '@nestjs/graphql';
import { InfoEntity } from 'src/info/entities/info.entity';

@ObjectType()
export class InfoType extends PickType(InfoEntity, [
  'id',
  'adress',
  'metro',
  'time_from',
  'time_to',
  'phone',
  'call_back',
  'site',
  'social',
  'longitude',
  'latitude',
  'eventId',
  'placeId',
]) {}
