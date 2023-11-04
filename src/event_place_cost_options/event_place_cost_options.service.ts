import { Injectable } from '@nestjs/common';
import { CreateEventPlaceCostOptionInput } from './dto/create-event_place_cost_option.input';
import { UpdateEventPlaceCostOptionInput } from './dto/update-event_place_cost_option.input';
import { InjectRepository } from '@nestjs/typeorm';
import { EventPlaceCostOptionEntity } from './entities/event_place_cost_option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventPlaceCostOptionsService {
  constructor(
    @InjectRepository(EventPlaceCostOptionEntity)
    private readonly EventPlaceCostOptionRepository: Repository<EventPlaceCostOptionEntity>,
  ) {}

  async create(
    createEventPlaceCostOptionInput: CreateEventPlaceCostOptionInput,
  ) {
    return await this.EventPlaceCostOptionRepository.save({
      ...createEventPlaceCostOptionInput,
    });
  }

  async findAll() {
    return await this.EventPlaceCostOptionRepository.find();
  }

  async findOne(id: number) {
    return await this.EventPlaceCostOptionRepository.findBy({ id });
  }

  async update(
    id: number,
    updateEventPlaceCostOptionInput: UpdateEventPlaceCostOptionInput,
  ) {
    return await this.EventPlaceCostOptionRepository.update(
      { id },
      { ...updateEventPlaceCostOptionInput },
    );
  }

  async remove(id: number) {
    await this.EventPlaceCostOptionRepository.delete({ id });
  }
}
