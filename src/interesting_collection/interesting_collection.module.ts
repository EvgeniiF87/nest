import { Module } from '@nestjs/common';
import { InterestingCollectionService } from './interesting_collection.service';
import { InterestingCollectionResolver } from './interesting_collection.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestingCollectionEntity } from './entities/interesting_collection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterestingCollectionEntity])],
  providers: [InterestingCollectionResolver, InterestingCollectionService],
})
export class InterestingCollectionModule {}
