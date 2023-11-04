import { Injectable } from '@nestjs/common';
import { CreatePlaceInput } from './dto/create-place.input';
import { UpdatePlaceInput } from './dto/update-place.input';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceEntity } from './entities/place.entity';
import { Like, Repository } from 'typeorm';
import { RequestPlace } from './dto/request-place.input';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(PlaceEntity)
    private readonly PlaceRepository: Repository<PlaceEntity>,
    private readonly tagService: TagService,
  ) {}

  async getCount() {
    return await this.PlaceRepository.count();
  }

  async create(createPlaceInput: CreatePlaceInput) {
    return await this.PlaceRepository.save({ ...createPlaceInput });
  }

  async findAll(params: RequestPlace) {
    return await this.PlaceRepository.find({
      where: [
        { direction: params?.direction && params.direction },
        { title: params?.title && Like(`%${params?.title}%`) },
        { desc: params?.desc && Like(`%${params?.desc}%`) },
        { tags: { tagsId: params.tagId && params.tagId } },
        { cityId: params.cityId && params.cityId },
      ],
      relations: {
        images: true,
        info: true,
        tags: { tags: true },
        costOption: { costOption: true },
      },
      take: params?.take && params?.take,
      skip: params?.skip && params?.skip,
    });
  }

  async findAllUserPlaces(id: number) {
    return await this.PlaceRepository.find({
      where: {
        userId: id,
      },
      relations: {
        images: true,
        info: true,
        tags: { tags: true },
        costOption: { costOption: true },
      },
    });
  }

  async findOne(id: number) {
    const place = await this.PlaceRepository.findOne({
      where: { id },
      relations: {
        images: true,
        info: true,
        tags: { tags: true },
        costOption: { costOption: true },
      },
    });

    return await this.convertData(place);
  }

  async update(id: number, updatePlaceInput: UpdatePlaceInput) {
    return await this.PlaceRepository.update({ id }, { ...updatePlaceInput });
  }

  async updateViews(id: number) {
    const place = await this.PlaceRepository.findOneBy({ id });
    return await this.PlaceRepository.update(
      { id },
      { views: place.views + 1 },
    );
  }

  async publish(id: number) {
    return await this.PlaceRepository.update({ id }, { publish: true });
  }

  async remove(id: number) {
    const isExist = await this.PlaceRepository.findOneBy({ id });

    if (!isExist)
      return { message: `место с id: ${id} не найдено`, status: 'error' };

    if (isExist) {
      await this.PlaceRepository.delete({ id });
      const isRemove = await this.findOne(id);
      if (!isRemove) {
        return {
          id,
          message: `место с id: ${id} успешно удалёно`,
          status: 'success',
        };
      } else {
        return { message: `место с id: ${id} не удалёно`, status: 'error' };
      }
    }
  }

  private async convertData(placeDefault: PlaceEntity) {
    const place = {};
    const info = {};
    const images = [];
    const tags = [];
    const costOptions = [];

    const placeInfo = await placeDefault.info;
    const placeImages = await placeDefault.images;
    const placeTags = await placeDefault.tags;
    const placeCostOption = await placeDefault.costOption;

    for (const key in placeDefault) {
      if (
        (await placeDefault[key]) !== placeInfo &&
        (await placeDefault[key]) !== placeImages &&
        (await placeDefault[key]) !== placeTags &&
        (await placeDefault[key]) !== placeCostOption
      ) {
        place[key] = placeDefault[key];
      }
    }

    for (const key in placeInfo) {
      info[key] = placeInfo[key];
    }

    placeImages.forEach((element) => {
      images.push(element.path);
    });

    placeTags.forEach((element) => {
      const tag = { id: element.tags.id, name: element.tags.name };
      tags.push(tag);
    });

    placeCostOption.forEach((element) => {
      const costOption = {
        name: element.costOption.name,
        price: element.price,
      };
      costOptions.push(costOption);
    });

    return {
      ...place,
      info,
      images,
      tags,
      costOptions,
    };
  }
}
