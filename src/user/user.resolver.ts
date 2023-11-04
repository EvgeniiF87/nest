import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { Role } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/role/role-types';
import CountResponse from 'src/response/count-response';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => CountResponse, { name: 'getUsersCount' })
  getCount() {
    const count = this.userService.getCount();
    return { count };
  }

  @Role(Roles.Admin)
  @Query(() => [UserEntity], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserEntity, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => UserEntity)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Role(Roles.Admin)
  @Mutation(() => UserEntity)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
