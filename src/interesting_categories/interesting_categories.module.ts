import { Module } from '@nestjs/common';
import { InterestingCategoriesService } from './interesting_categories.service';
import { InterestingCategoriesResolver } from './interesting_categories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestingCategoryEntity } from './entities/interesting_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterestingCategoryEntity])],
  providers: [InterestingCategoriesResolver, InterestingCategoriesService],
})
export class InterestingCategoriesModule {}
