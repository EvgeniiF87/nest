import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly RoleService: Repository<RoleEntity>,
  ) {}

  async create(createRoleInput: CreateRoleInput) {
    return await this.RoleService.save({ ...createRoleInput });
  }

  async findAll() {
    return await this.RoleService.find();
  }

  async findRoleName(name: string) {
    return await this.RoleService.findOne({ where: { name } });
  }

  async findOne(id: number) {
    return await this.RoleService.findOneBy({ id });
  }

  async update(id: number, updateRoleInput: UpdateRoleInput) {
    return await this.RoleService.update({ id }, { ...updateRoleInput });
  }

  async remove(id: number) {
    return await this.RoleService.delete({ id });
  }
}
