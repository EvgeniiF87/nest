import { Injectable } from '@nestjs/common';
import { CreateTokenInput } from './dto/create-token.input';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { addMonths } from 'date-fns';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async create(createTokenInput: CreateTokenInput) {
    return await this.tokenRepository.save({ ...createTokenInput });
  }

  async findOneUserID(userId: number) {
    return await this.tokenRepository.findOne({ where: { userId } });
  }

  async findOneRefreshToken(refresh_token: string) {
    return await this.tokenRepository.findOne({ where: { refresh_token } });
  }

  async update(id: number, updateTokenInput: CreateTokenInput) {
    return await this.tokenRepository.update({ id }, { ...updateTokenInput });
  }

  async remove(id: number) {
    return await this.tokenRepository.delete({ id });
  }

  async generateRefreshToken(userId: number): Promise<CreateTokenInput> {
    return { expire: addMonths(new Date(), 2), refresh_token: v4(), userId };
  }
}
