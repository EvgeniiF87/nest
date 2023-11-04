import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import Token from './response';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { SignInInput } from './dto/signin.dto';
import { Role } from './decorators/role.decorator';
import { Roles } from 'src/role/role-types';
import { UseGuards } from '@nestjs/common';
import { SignInGuard } from './guards/signin.guard';
import { User } from './decorators/user.decoratod';
import { CookieGuard } from './guards/cookie.guard';
import RefreshTokenResponse from './refresh_token.response';
import { AccessToken } from './decorators/token.decorator';

@Resolver(() => Token)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(SignInGuard)
  @Mutation(() => Token)
  signIn(
    @Args('signinUserInput') signInInput: SignInInput,
    @User() user: Token,
  ) {
    return user;
  }

  @Mutation(() => Token)
  registrationUser(
    @Args('registrationUserInput') createUserInput: CreateUserInput,
  ) {
    return this.authService.registrationUser(createUserInput);
  }

  @Role(Roles.Admin, Roles.Manager)
  @Mutation(() => Token)
  registrationMeneger(
    @Args('registrationUserInput') createUserInput: CreateUserInput,
  ) {
    return this.authService.registrationMeneger(createUserInput);
  }

  @UseGuards(CookieGuard)
  @Query(() => RefreshTokenResponse)
  refreshToken(@AccessToken() token: RefreshTokenResponse) {
    return token;
  }
}
