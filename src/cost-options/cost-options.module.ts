import { Module } from '@nestjs/common';
import { CostOptionsService } from './cost-options.service';
import { CostOptionsResolver } from './cost-options.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostOptionEntity } from './entities/cost-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CostOptionEntity])],
  providers: [CostOptionsResolver, CostOptionsService],
})
export class CostOptionsModule {}
