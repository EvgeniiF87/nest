import { CostOptionEntity } from 'src/cost-options/entities/cost-option.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import { costOptions } from '../fake-data/cost-options';

export default class CreateCostOptions implements Seeder {
  public async run(factory: Factory): Promise<any> {
    for (let c = 0; c < costOptions.length; c++) {
      await factory(CostOptionEntity)().create({
        name: costOptions[c],
      });
    }
  }
}
