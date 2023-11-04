import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InterestingCollectionService } from './interesting_collection.service';
import { InterestingCollectionEntity } from './entities/interesting_collection.entity';
import { CreateInterestingCollectionInput } from './dto/create-interesting_collection.input';
import { UpdateInterestingCollectionInput } from './dto/update-interesting_collection.input';
import InterestingCollectionsAndCount from './respons';
import RemoveResponse from 'src/response/remove-response';
import { Role } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/role/role-types';

@Resolver(() => InterestingCollectionEntity)
export class InterestingCollectionResolver {
  constructor(
    private readonly interestingCollectionService: InterestingCollectionService,
  ) {}

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => InterestingCollectionEntity)
  createInterestingCollection(
    @Args('createInterestingCollectionInput')
    createInterestingCollectionInput: CreateInterestingCollectionInput,
  ) {
    return this.interestingCollectionService.create(
      createInterestingCollectionInput,
    );
  }

  @Query(() => InterestingCollectionsAndCount, {
    name: 'interestingCollections',
  })
  findAll(
    @Args('catId', { type: () => Int, nullable: true }) catId?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ) {
    const collections = this.interestingCollectionService.findAll(
      catId,
      take,
      skip,
    );

    const count = this.interestingCollectionService.findAllCount();

    return { collections, count };
  }

  @Role(Roles.Admin, Roles.Manager, Roles.User)
  @Query(() => InterestingCollectionEntity, { name: 'interestingCollection' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.interestingCollectionService.findOne(id);
  }

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => InterestingCollectionEntity)
  updateInterestingCollection(
    @Args('updateInterestingCollectionInput')
    updateInterestingCollectionInput: UpdateInterestingCollectionInput,
  ) {
    return this.interestingCollectionService.update(
      updateInterestingCollectionInput.id,
      updateInterestingCollectionInput,
    );
  }

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => RemoveResponse)
  removeInterestingCollection(@Args('id', { type: () => Int }) id: number) {
    return this.interestingCollectionService.remove(id);
  }
}
