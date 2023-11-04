import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventPlaceCostOptionsService } from './event_place_cost_options.service';
import { EventPlaceCostOptionEntity } from './entities/event_place_cost_option.entity';
import { CreateEventPlaceCostOptionInput } from './dto/create-event_place_cost_option.input';
import { UpdateEventPlaceCostOptionInput } from './dto/update-event_place_cost_option.input';

@Resolver(() => EventPlaceCostOptionEntity)
export class EventPlaceCostOptionsResolver {
  constructor(
    private readonly eventPlaceCostOptionsService: EventPlaceCostOptionsService,
  ) {}

  @Mutation(() => EventPlaceCostOptionEntity)
  createEventPlaceCostOption(
    @Args('createEventPlaceCostOptionInput')
    createEventPlaceCostOptionInput: CreateEventPlaceCostOptionInput,
  ) {
    return this.eventPlaceCostOptionsService.create(
      createEventPlaceCostOptionInput,
    );
  }

  @Query(() => [EventPlaceCostOptionEntity], { name: 'eventPlaceCostOptions' })
  findAll() {
    return this.eventPlaceCostOptionsService.findAll();
  }

  @Query(() => EventPlaceCostOptionEntity, { name: 'eventPlaceCostOption' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.eventPlaceCostOptionsService.findOne(id);
  }

  @Mutation(() => EventPlaceCostOptionEntity)
  updateEventPlaceCostOption(
    @Args('updateEventPlaceCostOptionInput')
    updateEventPlaceCostOptionInput: UpdateEventPlaceCostOptionInput,
  ) {
    return this.eventPlaceCostOptionsService.update(
      updateEventPlaceCostOptionInput.id,
      updateEventPlaceCostOptionInput,
    );
  }

  @Mutation(() => EventPlaceCostOptionEntity)
  removeEventPlaceCostOption(@Args('id', { type: () => Int }) id: number) {
    return this.eventPlaceCostOptionsService.remove(id);
  }
}
