import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InterestingCollectionSelectionsService } from './interesting_collection_selections.service';
import { InterestingCollectionSelectionEntity } from './entities/interesting_collection_selections.entity';
import { CreateInterestingCollectionSelectionInput } from './dto/create-interesting_collection_selections.input';
import { UpdateInterestingCollectionSelectionInput } from './dto/update-interesting_collection_selections.input';
import { Role } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/role/role-types';

@Resolver(() => InterestingCollectionSelectionEntity)
export class InterestingCollectionSelectionsResolver {
  constructor(
    private readonly interestingCollectionSelectionsService: InterestingCollectionSelectionsService,
  ) {}

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => InterestingCollectionSelectionEntity)
  createInterestingCollectionSelection(
    @Args('createInterestingCollectionSelectionInput')
    createInterestingCollectionSelectionInput: CreateInterestingCollectionSelectionInput,
  ) {
    return this.interestingCollectionSelectionsService.create(
      createInterestingCollectionSelectionInput,
    );
  }

  @Role(Roles.Admin, Roles.Manager)
  @Query(() => [InterestingCollectionSelectionEntity], {
    name: 'interestingCollectionSelections',
  })
  findAll() {
    return this.interestingCollectionSelectionsService.findAll();
  }

  @Role(Roles.Admin, Roles.Manager)
  @Query(() => InterestingCollectionSelectionEntity, {
    name: 'interestingCollectionSelection',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.interestingCollectionSelectionsService.findOne(id);
  }

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => InterestingCollectionSelectionEntity)
  updateInterestingCollectionSelection(
    @Args('updateInterestingCollectionSelectionInput')
    updateInterestingCollectionSelectionInput: UpdateInterestingCollectionSelectionInput,
  ) {
    return this.interestingCollectionSelectionsService.update(
      updateInterestingCollectionSelectionInput.id,
      updateInterestingCollectionSelectionInput,
    );
  }

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => InterestingCollectionSelectionEntity)
  removeInterestingCollectionSelection(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.interestingCollectionSelectionsService.remove(id);
  }
}
