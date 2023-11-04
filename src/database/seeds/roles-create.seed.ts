import { Factory, Seeder } from 'typeorm-seeding';
import { RoleEntity } from 'src/role/entities/role.entity';
import { Roles } from 'src/role/role-types';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(RoleEntity)().create({ name: Roles.Admin });
    await factory(RoleEntity)().create({ name: Roles.Manager });
    await factory(RoleEntity)().create({ name: Roles.Client });
    await factory(RoleEntity)().create({ name: Roles.Client_manager });
    await factory(RoleEntity)().create({ name: Roles.Event_manager });
    await factory(RoleEntity)().create({ name: Roles.Event_organizer });
    await factory(RoleEntity)().create({ name: Roles.Junior_event_manager });
    await factory(RoleEntity)().create({ name: Roles.Place_manager });
    await factory(RoleEntity)().create({ name: Roles.Junior_place_manager });
    await factory(RoleEntity)().create({ name: Roles.User });
  }
}
