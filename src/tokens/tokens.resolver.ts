import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TokensService } from './tokens.service';
import { TokenEntity } from './entities/token.entity';
import { CreateTokenInput } from './dto/create-token.input';
import { UpdateTokenInput } from './dto/update-token.input';

@Resolver(() => TokenEntity)
export class TokensResolver {
  constructor(private readonly tokensService: TokensService) {}

  @Mutation(() => TokenEntity)
  createToken(@Args('createTokenInput') createTokenInput: CreateTokenInput) {
    return this.tokensService.create(createTokenInput);
  }

  // @Query(() => [TokenEntity], { name: 'tokens' })
  // findAll() {
  //   return this.tokensService.findAll();
  // }

  // @Query(() => TokenEntity, { name: 'token' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.tokensService.findOne(id);
  // }

  // @Mutation(() => TokenEntity)
  // updateToken(@Args('updateTokenInput') updateTokenInput: UpdateTokenInput) {
  //   return this.tokensService.update(updateTokenInput.id, updateTokenInput);
  // }

  // @Mutation(() => TokenEntity)
  // removeToken(@Args('id', { type: () => Int }) id: number) {
  //   return this.tokensService.remove(id);
  // }
}
