import { Module } from '@nestjs/common';
import { EventPlaceTagsService } from './event_place_tags.service';
import { EventPlaceTagsResolver } from './event_place_tags.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventPlaceTagEntity } from './entities/event_place_tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventPlaceTagEntity])],
  providers: [EventPlaceTagsResolver, EventPlaceTagsService],
})
export class EventPlaceTagsModule {}
