import { Module } from '@nestjs/common';
import { EventPlaceCostOptionsService } from './event_place_cost_options.service';
import { EventPlaceCostOptionsResolver } from './event_place_cost_options.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventPlaceCostOptionEntity } from './entities/event_place_cost_option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventPlaceCostOptionEntity])],
  providers: [EventPlaceCostOptionsResolver, EventPlaceCostOptionsService],
})
export class EventPlaceCostOptionsModule {}
