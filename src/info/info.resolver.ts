import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InfoService } from './info.service';
import { InfoEntity } from './entities/info.entity';
import { CreateInfoInput } from './dto/create-info.input';
import { UpdateInfoInput } from './dto/update-info.input';
import RemoveResponse from 'src/response/remove-response';
import { Roles } from 'src/role/role-types';
import { Role } from 'src/auth/decorators/role.decorator';

@Resolver(() => InfoEntity)
export class InfoResolver {
  constructor(private readonly infoService: InfoService) {}

  @Mutation(() => InfoEntity)
  createInfo(@Args('createInfoInput') createInfoInput: CreateInfoInput) {
    return this.infoService.create(createInfoInput);
  }

  @Query(() => [InfoEntity], { name: 'allInfo' })
  findAll() {
    return this.infoService.findAll();
  }

  @Query(() => InfoEntity, { name: 'info' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.infoService.findOne(id);
  }

  @Mutation(() => InfoEntity)
  updateInfo(@Args('updateInfoInput') updateInfoInput: UpdateInfoInput) {
    return this.infoService.update(updateInfoInput.id, updateInfoInput);
  }

  @Role(Roles.Admin)
  @Mutation(() => RemoveResponse)
  removeInfo(@Args('id', { type: () => Int }) id: number) {
    return this.infoService.remove(id);
  }
}
