import { TagEntity } from 'src/tag/entities/tag.entity';
import { define } from 'typeorm-seeding';

define(TagEntity, () => {
  const tag = new TagEntity();
  return tag;
});
