import { CostOptionEntity } from 'src/cost-options/entities/cost-option.entity';
import { define } from 'typeorm-seeding';

define(CostOptionEntity, () => {
  const options = new CostOptionEntity();
  return options;
});
