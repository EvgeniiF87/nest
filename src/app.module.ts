import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { EventModule } from './event/event.module';
import { TagModule } from './tag/tag.module';
import { CostOptionsModule } from './cost-options/cost-options.module';
import { ImagesModule } from './images/images.module';
import { PlaceModule } from './place/place.module';
import { InfoModule } from './info/info.module';
import { EventPlaceTagsModule } from './event_place_tags/event_place_tags.module';
import { EventPlaceCostOptionsModule } from './event_place_cost_options/event_place_cost_options.module';
import { InterestingCollectionModule } from './interesting_collection/interesting_collection.module';
import { InterestingCollectionSelectionsModule } from './interesting_collection_selections/interesting_collection_selections.module';
import { InterestingCategoriesModule } from './interesting_categories/interesting_categories.module';
import { InterestingCategorySelectModule } from './interesting_category_select/interesting_category_select.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { ormconfig } from './config/ormconfig';
import { GraphqlConfig } from './config/graphqlconfig';
import { join } from 'path';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
    GraphQLModule.forRoot(GraphqlConfig),
    TypeOrmModule.forRootAsync(ormconfig),
    UserModule,
    EventModule,
    TagModule,
    CostOptionsModule,
    ImagesModule,
    PlaceModule,
    InfoModule,
    EventPlaceTagsModule,
    EventPlaceCostOptionsModule,
    InterestingCollectionModule,
    InterestingCollectionSelectionsModule,
    InterestingCategoriesModule,
    InterestingCategorySelectModule,
    RoleModule,
    AuthModule,
    TokensModule,
    CitiesModule,
  ],
})
export class AppModule {}
