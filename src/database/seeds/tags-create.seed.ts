import { TagEntity } from 'src/tag/entities/tag.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import { tags } from '../fake-data/tags';

export default class CreateTags implements Seeder {
  public async run(factory: Factory): Promise<any> {
    for (let t = 0; t < tags.length; t++) {
      await factory(TagEntity)().create({
        name: tags[t],
      });
    }
  }
}
