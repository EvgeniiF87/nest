import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class CookieGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext();
    const req: Request = gqlContext.getContext().req;

    const cookie = req.cookies['refresh_token'];

    const token = await this.authService.refreshToken(cookie);

    ctx.token = token;

    return true;
  }
}
