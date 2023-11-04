import { ImageEntity } from 'src/images/entities/image.entity';
import { define } from 'typeorm-seeding';

define(ImageEntity, () => {
  const image = new ImageEntity();
  image.path =
    'http://78.24.180.193:7777/uploads/6245e043-c93f-4619-97b8-eab4c1713c4f.jpg';
  return image;
});
