import { Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { Like, Repository } from 'typeorm';
import { RequestEvent } from './dto/request-event.input';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly EventRepository: Repository<EventEntity>,
    private readonly tagService: TagService,
  ) {}

  async getCount() {
    return await this.EventRepository.count();
  }

  async create(createEventInput: CreateEventInput) {
    return await this.EventRepository.save({ ...createEventInput });
  }

  async findAll(params: RequestEvent) {
    return await this.EventRepository.find({
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

  async findAllUserEvents(id: number) {
    return await this.EventRepository.find({
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
    const event = await this.EventRepository.findOne({
      where: { id },
      relations: {
        images: true,
        info: true,
        tags: { tags: true },
        costOption: { costOption: true },
      },
    });

    return await this.convertData(event);
  }

  async update(id: number, updateEventInput: UpdateEventInput) {
    return await this.EventRepository.update({ id }, { ...updateEventInput });
  }

  async updateViews(id: number) {
    const event = await this.EventRepository.findOneBy({ id });
    return await this.EventRepository.update(
      { id },
      { views: event.views + 1 },
    );
  }

  async publish(id: number) {
    return await this.EventRepository.update({ id }, { publish: true });
  }

  async remove(id: number) {
    const isExist = await this.EventRepository.findOneBy({ id });

    if (!isExist)
      return { message: `событие с id: ${id} не найдено`, status: 'error' };

    if (isExist) {
      await this.EventRepository.delete({ id });
      const isRemove = await this.findOne(id);
      if (!isRemove) {
        return {
          id,
          message: `событие с id: ${id} успешно удалёно`,
          status: 'success',
        };
      } else {
        return { message: `событие с id: ${id} не удалёно`, status: 'error' };
      }
    }
  }

  private async convertData(eventDefault: EventEntity) {
    const event = {};
    const info = {};
    const images = [];
    const tags = [];
    const costOptions = [];

    const eventInfo = await eventDefault.info;
    const eventImages = await eventDefault.images;
    const eventTags = await eventDefault.tags;
    const eventCostOption = await eventDefault.costOption;

    for (const key in eventDefault) {
      if (
        (await eventDefault[key]) !== eventInfo &&
        (await eventDefault[key]) !== eventImages &&
        (await eventDefault[key]) !== eventTags &&
        (await eventDefault[key]) !== eventCostOption
      ) {
        event[key] = eventDefault[key];
      }
    }

    for (const key in eventInfo) {
      info[key] = eventInfo[key];
    }

    eventImages.forEach((element) => {
      images.push(element.path);
    });

    eventTags.forEach((element) => {
      const tag = { id: element.tags.id, name: element.tags.name };
      tags.push(tag);
    });

    eventCostOption.forEach((element) => {
      const costOption = {
        name: element.costOption.name,
        price: element.price,
      };
      costOptions.push(costOption);
    });

    return {
      ...event,
      info,
      images,
      tags,
      costOptions,
    };
  }
}
