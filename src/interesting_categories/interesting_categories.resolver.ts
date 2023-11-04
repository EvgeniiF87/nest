import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InterestingCategoriesService } from './interesting_categories.service';
import { InterestingCategoryEntity } from './entities/interesting_category.entity';
import { CreateInterestingCategoryInput } from './dto/create-interesting_category.input';
import { UpdateInterestingCategoryInput } from './dto/update-interesting_category.input';
import { Role } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/role/role-types';

@Resolver(() => InterestingCategoryEntity)
export class InterestingCategoriesResolver {
  constructor(
    private readonly interestingCategoriesService: InterestingCategoriesService,
  ) {}

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => InterestingCategoryEntity)
  createInterestingCategory(
    @Args('createInterestingCategoryInput')
    createInterestingCategoryInput: CreateInterestingCategoryInput,
  ) {
    return this.interestingCategoriesService.create(
      createInterestingCategoryInput,
    );
  }

  @Role(Roles.Admin, Roles.Manager)
  @Query(() => [InterestingCategoryEntity], { name: 'interestingCategories' })
  findAll() {
    return this.interestingCategoriesService.findAll();
  }

  @Role(Roles.Admin, Roles.Manager)
  @Query(() => InterestingCategoryEntity, { name: 'interestingCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.interestingCategoriesService.findOne(id);
  }

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => InterestingCategoryEntity)
  updateInterestingCategory(
    @Args('updateInterestingCategoryInput')
    updateInterestingCategoryInput: UpdateInterestingCategoryInput,
  ) {
    return this.interestingCategoriesService.update(
      updateInterestingCategoryInput.id,
      updateInterestingCategoryInput,
    );
  }

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => InterestingCategoryEntity)
  removeInterestingCategory(@Args('id', { type: () => Int }) id: number) {
    return this.interestingCategoriesService.remove(id);
  }
}
