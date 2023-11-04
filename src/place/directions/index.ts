import { registerEnumType } from '@nestjs/graphql';

export enum PlaceDirections {
  Museums = 'museums',
  Parks = 'parks',
  Walk = 'walk',
  Tourism = 'tourism',
  Restaurants = 'restaurants',
  Theaters = 'theaters',
  Space = 'space',
  Show = 'show',
  Other = 'other',
}

registerEnumType(PlaceDirections, {
  name: 'PlaceDirections',
  description: 'Направления для мест',
  valuesMap: {
    Museums: { description: 'музеи' },
    Parks: { description: 'парки' },
    Walk: { description: 'прогулки' },
    Tourism: { description: 'туризм' },
    Restaurants: { description: 'рестораны' },
    Theaters: { description: 'театры' },
    Space: { description: 'пространства' },
    Show: { description: 'клубы' },
    Other: { description: 'прочее' },
  },
});
