import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { CostOptionsService } from './cost-options.service';
import { CostOptionEntity } from './entities/cost-option.entity';
import { CreateCostOptionInput } from './dto/create-cost-option.input';
import { Role } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/role/role-types';
import { UpdateCostOptionInput } from './dto/update-cost-option.input';

@Resolver(() => CostOptionEntity)
export class CostOptionsResolver {
  constructor(private readonly costOptionsService: CostOptionsService) {}

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => CostOptionEntity)
  createCostOption(
    @Args('createCostOptionInput') createCostOptionInput: CreateCostOptionInput,
  ) {
    return this.costOptionsService.create(createCostOptionInput);
  }

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => CostOptionEntity)
  updateCostOption(
    @Args('updateCostOptionInput') updateCostOptionInput: UpdateCostOptionInput,
  ) {
    return this.costOptionsService.update(
      updateCostOptionInput.id,
      updateCostOptionInput,
    );
  }

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => CostOptionEntity)
  removeCostOption(@Args('id', { type: () => Int }) id: number) {
    return this.costOptionsService.remove(id);
  }
}
