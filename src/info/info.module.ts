import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoResolver } from './info.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoEntity } from './entities/info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InfoEntity])],
  providers: [InfoResolver, InfoService],
})
export class InfoModule {}
