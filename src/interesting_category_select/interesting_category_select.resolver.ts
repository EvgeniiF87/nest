import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InterestingCategorySelectService } from './interesting_category_select.service';
import { InterestingCategorySelectEntity } from './entities/interesting_category_select.entity';
import { CreateInterestingCategorySelectInput } from './dto/create-interesting_category_select.input';
import { UpdateInterestingCategorySelectInput } from './dto/update-interesting_category_select.input';
import { Role } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/role/role-types';

@Resolver(() => InterestingCategorySelectEntity)
export class InterestingCategorySelectResolver {
  constructor(
    private readonly interestingCategorySelectService: InterestingCategorySelectService,
  ) {}

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => InterestingCategorySelectEntity)
  createInterestingCategorySelect(
    @Args('createInterestingCategorySelectInput')
    createInterestingCategorySelectInput: CreateInterestingCategorySelectInput,
  ) {
    return this.interestingCategorySelectService.create(
      createInterestingCategorySelectInput,
    );
  }

  @Role(Roles.Admin, Roles.Manager)
  @Query(() => [InterestingCategorySelectEntity], {
    name: 'interestingCategorySelect',
  })
  findAll() {
    return this.interestingCategorySelectService.findAll();
  }

  @Role(Roles.Admin, Roles.Manager)
  @Query(() => InterestingCategorySelectEntity, {
    name: 'interestingCategorySelect',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.interestingCategorySelectService.findOne(id);
  }

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => InterestingCategorySelectEntity)
  updateInterestingCategorySelect(
    @Args('updateInterestingCategorySelectInput')
    updateInterestingCategorySelectInput: UpdateInterestingCategorySelectInput,
  ) {
    return this.interestingCategorySelectService.update(
      updateInterestingCategorySelectInput.id,
      updateInterestingCategorySelectInput,
    );
  }

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => InterestingCategorySelectEntity)
  removeInterestingCategorySelect(@Args('id', { type: () => Int }) id: number) {
    return this.interestingCategorySelectService.remove(id);
  }
}
