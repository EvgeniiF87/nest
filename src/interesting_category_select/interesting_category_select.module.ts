import { Module } from '@nestjs/common';
import { InterestingCategorySelectService } from './interesting_category_select.service';
import { InterestingCategorySelectResolver } from './interesting_category_select.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestingCategorySelectEntity } from './entities/interesting_category_select.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterestingCategorySelectEntity])],
  providers: [
    InterestingCategorySelectResolver,
    InterestingCategorySelectService,
  ],
})
export class InterestingCategorySelectModule {}
