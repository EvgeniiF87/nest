import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/role/role-types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const req = await gqlContext.getContext().req;

    try {
      const requiredRoles = this.reflector.getAllAndOverride<Roles[]>('role', [
        gqlContext.getHandler(),
        gqlContext.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }
      const bearerToken: string = await req.headers.authorization;
      const bearer = bearerToken.split(' ')[0];
      const token = bearerToken.split(' ')[1];

      if (bearer !== 'Bearer' || !token)
        throw new UnauthorizedException('Вы не авторизованы!');

      const user = this.jwtService.verify(token);

      req.user = user;
      return requiredRoles.some((role) => user.role?.includes(role));
    } catch (e) {
      throw new HttpException('У вас нет доступа!', HttpStatus.FORBIDDEN);
    }
  }
}
