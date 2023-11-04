import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly roleService: RoleService,
  ) {}

  async getCount() {
    return await this.userRepository.count();
  }

  async create(createUserInput: CreateUserInput) {
    const { id } = await this.roleService.findRoleName('user');
    return await this.userRepository.save({ ...createUserInput, roleId: id });
  }

  async createManagers(createUserInput: CreateUserInput) {
    return await this.userRepository.save({ ...createUserInput });
  }

  async findAll() {
    return await this.userRepository.find({
      relations: {
        role: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: {
        role: true,
      },
    });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    return await this.userRepository.update({ id }, { ...updateUserInput });
  }

  async remove(id: number) {
    return await this.userRepository.delete({ id });
  }

  async isExist(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: { role: true },
    });
  }
}
