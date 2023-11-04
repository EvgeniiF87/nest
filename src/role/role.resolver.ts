import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from 'src/auth/decorators/role.decorator';
import { Roles } from './role-types';

@Resolver(() => RoleEntity)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Role(Roles.Admin)
  @Mutation(() => RoleEntity)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.roleService.create(createRoleInput);
  }

  @Query(() => [RoleEntity], { name: 'role' })
  findAll() {
    return this.roleService.findAll();
  }

  @Query(() => RoleEntity, { name: 'role' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.roleService.findOne(id);
  }

  @Role(Roles.Admin)
  @Mutation(() => RoleEntity)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.roleService.update(updateRoleInput.id, updateRoleInput);
  }

  @Role(Roles.Admin)
  @Mutation(() => RoleEntity)
  removeRole(@Args('id', { type: () => Int }) id: number) {
    return this.roleService.remove(id);
  }
}
