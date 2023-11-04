import { registerEnumType } from '@nestjs/graphql';

export enum EventDirections {
  Exhibitions = 'exhibitions',
  Festivals = 'festivals',
  Kids = 'kids',
  Leisure = 'leisure',
  Movie = 'movie',
  Music = 'music',
  Show = 'show',
  Holidays = 'holidays',
  Education = 'education',
}

registerEnumType(EventDirections, {
  name: 'EventDirections',
  description: 'Направления для событий',
  valuesMap: {
    Exhibitions: { description: 'выставки' },
    Festivals: { description: 'фестивали' },
    Kids: { description: 'с детьми' },
    Leisure: { description: 'активный отдых' },
    Movie: { description: 'кино' },
    Music: { description: 'музыка' },
    Show: { description: 'шоу' },
    Holidays: { description: 'праздники' },
    Education: { description: 'образование' },
  },
});
