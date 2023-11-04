import { RoleEntity } from 'src/role/entities/role.entity';
import { define } from 'typeorm-seeding';

define(RoleEntity, () => {
  const role = new RoleEntity();
  return role;
});
