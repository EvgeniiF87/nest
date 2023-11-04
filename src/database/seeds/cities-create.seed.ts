import { CityEntity } from 'src/cities/entities/city.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import { russianCities } from '../fake-data/russian-cities';

export default class CreateCities implements Seeder {
  public async run(factory: Factory): Promise<any> {
    for (let i = 0; i < russianCities.length; i++) {
      const coords = russianCities[i].coords;
      await factory(CityEntity)().create({
        district: russianCities[i].district,
        subject: russianCities[i].subject,
        name: russianCities[i].name,
        longitude: coords.lon,
        latitude: coords.lat,
      });
    }
  }
}
