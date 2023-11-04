import { EventPlaceCostOptionEntity } from 'src/event_place_cost_options/entities/event_place_cost_option.entity';
import { define } from 'typeorm-seeding';

define(EventPlaceCostOptionEntity, () => {
  const costOptions = new EventPlaceCostOptionEntity();
  return costOptions;
});
