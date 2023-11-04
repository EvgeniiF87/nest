import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from 'src/role/role-types';

export function Role(...role: Roles[]) {
  return applyDecorators(
    SetMetadata('role', role),
    UseGuards(AuthGuard, RoleGuard),
  );
}
