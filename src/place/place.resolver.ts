import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlaceService } from './place.service';
import { PlaceEntity } from './entities/place.entity';
import { CreatePlaceInput } from './dto/create-place.input';
import { UpdatePlaceInput } from './dto/update-place.input';
import RemoveResponse from 'src/response/remove-response';
import { Role } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/role/role-types';
import CountResponse from 'src/response/count-response';
import { RequestPlace } from './dto/request-place.input';
import PlaceResponse from 'src/response/place-response';

@Resolver(() => PlaceEntity)
export class PlaceResolver {
  constructor(private readonly placeService: PlaceService) {}

  @Query(() => CountResponse, { name: 'getPlacesCount' })
  getCount() {
    const count = this.placeService.getCount();
    return { count };
  }

  @Role(
    Roles.Admin,
    Roles.Manager,
    Roles.Place_manager,
    Roles.Junior_place_manager,
    Roles.Client,
    Roles.User,
  )
  @Mutation(() => PlaceEntity)
  createPlace(@Args('createPlaceInput') createPlaceInput: CreatePlaceInput) {
    return this.placeService.create(createPlaceInput);
  }

  @Role(
    Roles.Admin,
    Roles.Manager,
    Roles.Place_manager,
    Roles.Junior_place_manager,
    Roles.Client,
    Roles.Client_manager,
    Roles.User,
  )
  @Query(() => [PlaceEntity], { name: 'placesDashboard' })
  findAllDashboard(@Args('params', { nullable: true }) params?: RequestPlace) {
    return this.placeService.findAll(params);
  }

  @Query(() => [PlaceEntity], { name: 'places' })
  findAll(@Args('params', { nullable: true }) params?: RequestPlace) {
    return this.placeService.findAll(params);
  }

  @Role(
    Roles.Admin,
    Roles.Manager,
    Roles.Place_manager,
    Roles.Junior_place_manager,
    Roles.Client,
    Roles.Client_manager,
    Roles.User,
  )
  @Query(() => PlaceEntity, { name: 'placeDashboard' })
  findOneDashboard(@Args('id', { type: () => Int }) id: number) {
    return this.placeService.findOne(id);
  }

  @Query(() => PlaceResponse, { name: 'place' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.placeService.findOne(id);
  }

  //TODO сделать гвард который будет отдовать по айдишнику его места
  @Role(
    Roles.Admin,
    Roles.Manager,
    Roles.Place_manager,
    Roles.Junior_place_manager,
    Roles.Client,
    Roles.Client_manager,
    Roles.User,
  )
  @Query(() => [PlaceEntity], { name: 'userPlaces' })
  userPlaces(@Args('id', { type: () => Int }) id: number) {
    return this.placeService.findAllUserPlaces(id);
  }

  @Role(Roles.Admin, Roles.Manager, Roles.Place_manager, Roles.Client)
  @Mutation(() => PlaceEntity)
  publishPlace(@Args('id', { type: () => Int }) id: number) {
    return this.placeService.publish(id);
  }

  @Role(Roles.Admin, Roles.Manager, Roles.Place_manager, Roles.Client)
  @Mutation(() => PlaceEntity)
  updatePlace(@Args('updatePlaceInput') updatePlaceInput: UpdatePlaceInput) {
    return this.placeService.update(updatePlaceInput.id, updatePlaceInput);
  }

  @Mutation(() => PlaceEntity)
  updatePlaceViews(@Args('id', { type: () => Int }) id: number) {
    return this.placeService.updateViews(id);
  }

  @Role(Roles.Admin)
  @Mutation(() => RemoveResponse)
  removePlace(@Args('id', { type: () => Int }) id: number) {
    return this.placeService.remove(id);
  }
}
