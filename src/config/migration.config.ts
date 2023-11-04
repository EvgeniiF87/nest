import { join } from 'path';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CostOptionEntity } from 'src/cost-options/entities/cost-option.entity';
import { EventEntity } from 'src/event/entities/event.entity';
import { EventPlaceCostOptionEntity } from 'src/event_place_cost_options/entities/event_place_cost_option.entity';
import { EventPlaceTagEntity } from 'src/event_place_tags/entities/event_place_tag.entity';
import { ImageEntity } from 'src/images/entities/image.entity';
import { InfoEntity } from 'src/info/entities/info.entity';
import { InterestingCategoryEntity } from 'src/interesting_categories/entities/interesting_category.entity';
import { InterestingCategorySelectEntity } from 'src/interesting_category_select/entities/interesting_category_select.entity';
import { InterestingCollectionEntity } from 'src/interesting_collection/entities/interesting_collection.entity';
import { InterestingCollectionSelectionEntity } from 'src/interesting_collection_selections/entities/interesting_collection_selections.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
import { TagEntity } from 'src/tag/entities/tag.entity';
import { TokenEntity } from 'src/tokens/entities/token.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CityEntity } from 'src/cities/entities/city.entity';

config({ path: join(process.cwd(), '.env') });

export const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  schema: process.env.TYPEORM_SCHEMA,
  port: +process.env.DB_PORT,
  // username: process.env.TYPEORM_USERNAME,
  // database: process.env.TYPEORM_DATABASE,
  // password: process.env.TYPEORM_PASSWORD,
  username: process.env.FAKE_USERNAME,
  database: process.env.FAKE_DATABASE,
  password: process.env.FAKE_PASSWORD,
  entities: [
    CostOptionEntity,
    EventEntity,
    EventPlaceCostOptionEntity,
    EventPlaceTagEntity,
    ImageEntity,
    InfoEntity,
    InterestingCategoryEntity,
    InterestingCategorySelectEntity,
    InterestingCollectionEntity,
    InterestingCollectionSelectionEntity,
    PlaceEntity,
    RoleEntity,
    TagEntity,
    TokenEntity,
    UserEntity,
    CityEntity,
  ],
  migrations: [join(process.cwd(), 'src', 'database', 'migrations', '*.ts')],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(options);

export default dataSource;
