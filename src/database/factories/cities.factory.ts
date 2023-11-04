import { CityEntity } from 'src/cities/entities/city.entity';
import { define } from 'typeorm-seeding';

define(CityEntity, () => {
  const city = new CityEntity();
  return city;
});
