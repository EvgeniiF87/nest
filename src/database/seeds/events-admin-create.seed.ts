import { EventEntity } from 'src/event/entities/event.entity';
import { ImageEntity } from 'src/images/entities/image.entity';
import { InfoEntity } from 'src/info/entities/info.entity';
import { TagEntity } from 'src/tag/entities/tag.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import * as getRandomElements from 'random-elements-array';
import { faker } from '@faker-js/faker';
import { EventPlaceTagEntity } from 'src/event_place_tags/entities/event_place_tag.entity';
import { EventDirections } from 'src/event/directions';
import { CostOptionEntity } from 'src/cost-options/entities/cost-option.entity';
import { EventPlaceCostOptionEntity } from 'src/event_place_cost_options/entities/event_place_cost_option.entity';
import { costOptions } from '../fake-data/cost-options';

const RandomTagsID = async (tags: number[], min = 5, max = 12) => {
  const randomsID = await getRandomElements(
    tags,
    faker.number.int({ min, max }),
  );

  return [...randomsID];
};

const randomNumber = (min = 5, max = 12) => faker.number.int({ min, max });
const randomPrice = (min = 300, max = 1200) => faker.number.int({ min, max });

const RandomCostOptionsID = async (costOptions: number[], min = 1, max = 3) => {
  const randomsID = await getRandomElements(
    costOptions,
    faker.number.int({ min, max }),
  );

  return [...randomsID];
};

export default class CreateAdminEvents implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const directions = Object.keys(EventDirections).map(
      (direction) => direction,
    );

    const costOptionsID = [];

    for (let c = 0; c < costOptions.length; c++) {
      const cost = await factory(CostOptionEntity)().create({
        name: costOptions[c],
      });

      costOptionsID.push(cost.id);
    }

    const tags: TagEntity[] = await factory(TagEntity)().createMany(40);
    const tagsID = tags.map((tag: TagEntity) => tag.id);

    for (let d = 0; d < directions.length; d++) {
      const direction = directions[d];

      for (let i = 0; i < randomNumber(); i++) {
        const event = await factory(EventEntity)().create({
          direction: EventDirections[direction],
        });

        const randomTagsID = await RandomTagsID(tagsID);
        const randomCostOptionsID = await RandomCostOptionsID(costOptionsID);

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
  }
}
