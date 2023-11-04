import { Injectable } from '@nestjs/common';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly ImageRepository: Repository<ImageEntity>,
  ) {}

  async create(createImageInput: CreateImageInput) {
    return await this.ImageRepository.save({ ...createImageInput });
  }

  async findAll() {
    return await this.ImageRepository.find();
  }

  async findOne(id: number) {
    return await this.ImageRepository.findBy({ id });
  }

  async update(id: number, updateImageInput: UpdateImageInput) {
    return await this.ImageRepository.update({ id }, { ...updateImageInput });
  }

  async remove(id: number) {
    const isExist = await this.ImageRepository.findOneBy({ id });

    if (!isExist)
      return { message: `изображение с id: ${id} не найдено`, status: 'error' };

    if (isExist) {
      await this.ImageRepository.delete({ id });
      const isRemove = await this.findOne(id);
      if (!isRemove) {
        return {
          id,
          message: `изображение с id: ${id} успешно удалёно`,
          status: 'success',
        };
      } else {
        return {
          message: `изображение с id: ${id} не удалёно`,
          status: 'error',
        };
      }
    }
  }
}
