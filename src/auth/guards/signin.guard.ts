import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class SignInGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly tokensService: TokensService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext();
    const req = gqlContext.getContext().req;
    const signinUserInput = context
      .switchToHttp()
      .getResponse().signinUserInput;

    const signInUser = await this.authService.validateUser(signinUserInput);
    const { token } = this.authService.generateToken(signInUser);
    const { id, role } = signInUser;

    const user = { token, userId: id, role: role.name };

    ctx.user = user;

    const currentRefreshToken = await this.tokensService.findOneUserID(
      signInUser.id,
    );
    this.authService.setCookies(currentRefreshToken, req.res);
    return true;
  }
}
