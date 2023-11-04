import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
  Admin = 'admin',
  Manager = 'manager',
  Event_manager = 'event_manager',
  Place_manager = 'place_manager',
  Junior_event_manager = 'junior_event_manager',
  Junior_place_manager = 'junior_place_manager',
  Client = 'client',
  Client_manager = 'client_manager',
  Event_organizer = 'event_organizer',
  User = 'user',
}

registerEnumType(Roles, {
  name: 'Roles',
  description: 'Описание ролей',
  valuesMap: {
    Admin: { description: 'администратор' },
    Manager: { description: 'управляющий' },
    Event_manager: { description: 'менеджер по событиям' },
    Place_manager: { description: 'менеджер по местам' },
    Junior_event_manager: { description: 'младший менеджер по событиям' },
    Junior_place_manager: { description: 'младший менеджер по местам' },
    Client: { description: 'клиент, хозяин заведения' },
    Client_manager: {
      description: 'менеджер клиента, помошник хозяина заведения',
    },
    Event_organizer: { description: 'организатор событий' },
    User: { description: 'пользователь' },
  },
});
