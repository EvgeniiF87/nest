import { Injectable } from '@nestjs/common';
import { CreateInterestingCategorySelectInput } from './dto/create-interesting_category_select.input';
import { UpdateInterestingCategorySelectInput } from './dto/update-interesting_category_select.input';
import { InjectRepository } from '@nestjs/typeorm';
import { InterestingCategorySelectEntity } from './entities/interesting_category_select.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InterestingCategorySelectService {
  constructor(
    @InjectRepository(InterestingCategorySelectEntity)
    private readonly InterestingCategorySelectRepository: Repository<InterestingCategorySelectEntity>,
  ) {}

  async create(
    createInterestingCategorySelectInput: CreateInterestingCategorySelectInput,
  ) {
    return await this.InterestingCategorySelectRepository.save({
      ...createInterestingCategorySelectInput,
    });
  }

  async findAll() {
    return await this.InterestingCategorySelectRepository.find();
  }

  async findOne(id: number) {
    return await this.InterestingCategorySelectRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateInterestingCategorySelectInput: UpdateInterestingCategorySelectInput,
  ) {
    return await this.InterestingCategorySelectRepository.update(
      { id },
      { ...updateInterestingCategorySelectInput },
    );
  }

  async remove(id: number) {
    return await this.InterestingCategorySelectRepository.delete({ id });
  }
}
