import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventPlaceTagsService } from './event_place_tags.service';
import { EventPlaceTagEntity } from './entities/event_place_tag.entity';
import { CreateEventPlaceTagInput } from './dto/create-event_place_tag.input';
import { UpdateEventPlaceTagInput } from './dto/update-event_place_tag.input';

@Resolver(() => EventPlaceTagEntity)
export class EventPlaceTagsResolver {
  constructor(private readonly eventPlaceTagsService: EventPlaceTagsService) {}

  @Mutation(() => EventPlaceTagEntity)
  createEventPlaceTag(
    @Args('createEventPlaceTagInput')
    createEventPlaceTagInput: CreateEventPlaceTagInput,
  ) {
    return this.eventPlaceTagsService.create(createEventPlaceTagInput);
  }

  @Query(() => [EventPlaceTagEntity], { name: 'eventPlaceTags' })
  findAll() {
    return this.eventPlaceTagsService.findAll();
  }

  @Query(() => EventPlaceTagEntity, { name: 'eventPlaceTag' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.eventPlaceTagsService.findOne(id);
  }

  @Mutation(() => EventPlaceTagEntity)
  updateEventPlaceTag(
    @Args('updateEventPlaceTagInput')
    updateEventPlaceTagInput: UpdateEventPlaceTagInput,
  ) {
    return this.eventPlaceTagsService.update(
      updateEventPlaceTagInput.id,
      updateEventPlaceTagInput,
    );
  }

  @Mutation(() => EventPlaceTagEntity)
  removeEventPlaceTag(@Args('id', { type: () => Int }) id: number) {
    return this.eventPlaceTagsService.remove(id);
  }
}
