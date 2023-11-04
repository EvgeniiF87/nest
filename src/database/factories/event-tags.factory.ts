import { EventPlaceTagEntity } from 'src/event_place_tags/entities/event_place_tag.entity';
import { define } from 'typeorm-seeding';

define(EventPlaceTagEntity, () => {
  const eventTag = new EventPlaceTagEntity();
  return eventTag;
});
