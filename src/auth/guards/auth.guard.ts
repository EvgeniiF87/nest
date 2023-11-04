import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const req = await gqlContext.getContext().req;

    try {
      const bearerToken: string = await req.headers.authorization;
      const bearer = bearerToken.split(' ')[0];
      const token = bearerToken.split(' ')[1];

      if (bearer !== 'Bearer' || !token)
        throw new UnauthorizedException('Вы не авторизованы!');

      const user = this.jwtService.verify(token);

      req.user = user;
    } catch (e) {
      throw new UnauthorizedException('Вы не авторизованы!');
    }

    return true;
  }
}
