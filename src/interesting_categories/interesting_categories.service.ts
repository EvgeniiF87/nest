import { Injectable } from '@nestjs/common';
import { CreateInterestingCategoryInput } from './dto/create-interesting_category.input';
import { UpdateInterestingCategoryInput } from './dto/update-interesting_category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { InterestingCategoryEntity } from './entities/interesting_category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InterestingCategoriesService {
  constructor(
    @InjectRepository(InterestingCategoryEntity)
    private readonly InterestingCategoryRepository: Repository<InterestingCategoryEntity>,
  ) {}

  async create(createInterestingCategoryInput: CreateInterestingCategoryInput) {
    return this.InterestingCategoryRepository.save({
      ...createInterestingCategoryInput,
    });
  }

  async findAll() {
    return await this.InterestingCategoryRepository.find();
  }

  async findOne(id: number) {
    return await this.InterestingCategoryRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateInterestingCategoryInput: UpdateInterestingCategoryInput,
  ) {
    return await this.InterestingCategoryRepository.update(
      { id },
      { ...updateInterestingCategoryInput },
    );
  }

  async remove(id: number) {
    return await this.InterestingCategoryRepository.delete({ id });
  }
}
