import { EventEntity } from 'src/event/entities/event.entity';
import { ImageEntity } from 'src/images/entities/image.entity';
import { InfoEntity } from 'src/info/entities/info.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import * as getRandomElements from 'random-elements-array';
import { faker } from '@faker-js/faker';
import { EventPlaceTagEntity } from 'src/event_place_tags/entities/event_place_tag.entity';
import { EventDirections } from 'src/event/directions';
import { PlaceDirections } from 'src/place/directions';
import { EventPlaceCostOptionEntity } from 'src/event_place_cost_options/entities/event_place_cost_option.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { DataSource } from 'typeorm';
import { Roles } from 'src/role/role-types';

interface Ioptions {
  min?: number;
  max?: number;
  count?: number;
}

const RandomsID = async (arr: number[], options?: Ioptions) => {
  const min = options?.min ? options?.min : 5;
  const max = options?.max ? options?.max : 12;
  const rCount = options?.count
    ? options?.count
    : faker.number.int({ min, max });
  return await getRandomElements(arr, rCount);
};

const adminID = async (dataSource: DataSource) => {
  const adminRoleID = await dataSource.query(
    `SELECT id FROM roles WHERE roles.name = '${Roles.Admin}'`,
  );

  const admin = await dataSource.query(
    `SELECT id FROM users WHERE users."roleId" = ${adminRoleID[0].id}`,
  );

  return admin[0].id;
};

const randomNumber = (min = 5, max = 12) => faker.number.int({ min, max });
const randomPrice = (min = 300, max = 1200) => faker.number.int({ min, max });

export default class CreateAdminEventsAndPlaces implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    const citiesID = await dataSource.query('SELECT id FROM cities');
    const tagsID = await dataSource.query('SELECT id FROM tags');
    const costOptionsID = await dataSource.query('SELECT id FROM cost_options');
    const adminId = await adminID(dataSource);

    const eventDirections = Object.keys(EventDirections).map(
      (direction) => direction,
    );

    const placeDirections = Object.keys(PlaceDirections).map(
      (direction) => direction,
    );

    const randomCitiesID = await RandomsID(citiesID, { count: 30 });

    for (let i = 0; i < randomCitiesID.length; i++) {
      const cityId = randomCitiesID[i];

      // Создание событий
      for (let d = 0; d < eventDirections.length; d++) {
        const direction = eventDirections[d];

        for (let i = 0; i < randomNumber(); i++) {
          const event = await factory(EventEntity)().create({
            direction: EventDirections[direction],
            userId: adminId,
            cityId,
          });

          const randomTagsID = await RandomsID(tagsID);
          const randomCostOptionsID = await RandomsID(costOptionsID, {
            count: 3,
          });

          await factory(InfoEntity)().create({ eventId: event.id });

          await factory(ImageEntity)().createMany(randomNumber(), {
            eventId: event.id,
          });

          for (let t = 0; t < randomTagsID.length; t++) {
            const tagsId = randomTagsID[t];
            await factory(EventPlaceTagEntity)().create({
              eventId: event.id,
              tagsId,
            });
          }

          for (let cost = 0; cost < randomCostOptionsID.length; cost++) {
            const costOptionId = randomCostOptionsID[cost];
            await factory(EventPlaceCostOptionEntity)().create({
              eventId: event.id,
              costOptionId,
              price: String(randomPrice()),
            });
          }
        }
      }

      // Создание мест
      for (let p = 0; p < placeDirections.length; p++) {
        const direction = placeDirections[p];

        for (let i = 0; i < randomNumber(); i++) {
          const place = await factory(PlaceEntity)().create({
            direction: PlaceDirections[direction],
            userId: adminId,
            cityId,
          });

          const randomTagsID = await RandomsID(tagsID);
          const randomCostOptionsID = await RandomsID(costOptionsID, {
            count: 3,
          });

          await factory(InfoEntity)().create({ placeId: place.id });

          await factory(ImageEntity)().createMany(randomNumber(), {
            placeId: place.id,
          });

          for (let t = 0; t < randomTagsID.length; t++) {
            const tagsId = randomTagsID[t];
            await factory(EventPlaceTagEntity)().create({
              placeId: place.id,
              tagsId,
            });
          }

          for (let cost = 0; cost < randomCostOptionsID.length; cost++) {
            const costOptionId = randomCostOptionsID[cost];
            await factory(EventPlaceCostOptionEntity)().create({
              placeId: place.id,
              costOptionId,
              price: String(randomPrice()),
            });
          }
        }
      }
    }
  }
}
