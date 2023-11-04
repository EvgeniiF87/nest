import { InfoEntity } from 'src/info/entities/info.entity';
import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

define(InfoEntity, () => {
  const info = new InfoEntity();
  const address = `${faker.location.state()}, ${faker.location.streetAddress(
    false,
  )}`;

  info.adress = address;
  info.metro = faker.location.street();
  info.time_from = '10:00';
  info.time_to = '22:00';
  info.longitude = String(faker.location.longitude());
  info.latitude = String(faker.location.latitude());
  return info;
});
