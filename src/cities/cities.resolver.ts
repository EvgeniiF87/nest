import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CitiesService } from './cities.service';
import { CityEntity } from './entities/city.entity';
import { CreateCityInput } from './dto/create-city.input';
import { UpdateCityInput } from './dto/update-city.input';

@Resolver(() => CityEntity)
export class CitiesResolver {
  constructor(private readonly citiesService: CitiesService) {}

  @Mutation(() => CityEntity)
  createCity(@Args('createCityInput') createCityInput: CreateCityInput) {
    return this.citiesService.create(createCityInput);
  }

  @Query(() => [CityEntity], { name: 'cities' })
  findAll() {
    return this.citiesService.findAll();
  }

  @Query(() => CityEntity, { name: 'city' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.citiesService.findOne(id);
  }

  @Mutation(() => CityEntity)
  updateCity(@Args('updateCityInput') updateCityInput: UpdateCityInput) {
    return this.citiesService.update(updateCityInput.id, updateCityInput);
  }

  @Mutation(() => CityEntity)
  removeCity(@Args('id', { type: () => Int }) id: number) {
    return this.citiesService.remove(id);
  }
}
