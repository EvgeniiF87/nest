import { Injectable } from '@nestjs/common';
import { CreateEventPlaceTagInput } from './dto/create-event_place_tag.input';
import { UpdateEventPlaceTagInput } from './dto/update-event_place_tag.input';
import { InjectRepository } from '@nestjs/typeorm';
import { EventPlaceTagEntity } from './entities/event_place_tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventPlaceTagsService {
  constructor(
    @InjectRepository(EventPlaceTagEntity)
    private readonly EventPlaceTagRepository: Repository<EventPlaceTagEntity>,
  ) {}

  async create(createEventPlaceTagInput: CreateEventPlaceTagInput) {
    return await this.EventPlaceTagRepository.save({
      ...createEventPlaceTagInput,
    });
  }

  async findAll() {
    return await this.EventPlaceTagRepository.find();
  }

  async findOne(id: number) {
    return await this.EventPlaceTagRepository.findBy({ id });
  }

  async update(id: number, updateEventPlaceTagInput: UpdateEventPlaceTagInput) {
    return await this.EventPlaceTagRepository.update(
      { id },
      { ...updateEventPlaceTagInput },
    );
  }

  async remove(id: number) {
    await this.EventPlaceTagRepository.delete({ id });
  }
}
