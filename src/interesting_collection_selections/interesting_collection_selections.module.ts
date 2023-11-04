import { Module } from '@nestjs/common';
import { InterestingCollectionSelectionsService } from './interesting_collection_selections.service';
import { InterestingCollectionSelectionsResolver } from './interesting_collection_selections.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestingCollectionSelectionEntity } from './entities/interesting_collection_selections.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterestingCollectionSelectionEntity])],
  providers: [
    InterestingCollectionSelectionsResolver,
    InterestingCollectionSelectionsService,
  ],
})
export class InterestingCollectionSelectionsModule {}
