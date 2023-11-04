import { Injectable } from '@nestjs/common';
import { CreateInterestingCollectionSelectionInput } from './dto/create-interesting_collection_selections.input';
import { UpdateInterestingCollectionSelectionInput } from './dto/update-interesting_collection_selections.input';
import { InjectRepository } from '@nestjs/typeorm';
import { InterestingCollectionSelectionEntity } from './entities/interesting_collection_selections.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InterestingCollectionSelectionsService {
  constructor(
    @InjectRepository(InterestingCollectionSelectionEntity)
    private readonly InterestingCollectionSelectionRepository: Repository<InterestingCollectionSelectionEntity>,
  ) {}

  async create(
    createInterestingCollectionSelectionInput: CreateInterestingCollectionSelectionInput,
  ) {
    return this.InterestingCollectionSelectionRepository.create({
      ...createInterestingCollectionSelectionInput,
    });
  }

  async findAll() {
    return await this.InterestingCollectionSelectionRepository.find({
      relations: {
        interesting: true,
        event: true,
        place: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.InterestingCollectionSelectionRepository.findOne({
      where: { interestingId: id },
      relations: {
        interesting: true,
        event: true,
        place: true,
      },
    });
  }

  async update(
    id: number,
    updateInterestingCollectionSelectionInput: UpdateInterestingCollectionSelectionInput,
  ) {
    return await this.InterestingCollectionSelectionRepository.update(
      { id },
      { ...updateInterestingCollectionSelectionInput },
    );
  }

  async remove(id: number) {
    return await this.InterestingCollectionSelectionRepository.delete({ id });
  }
}
