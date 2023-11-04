import { UserEntity } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { Roles } from 'src/role/role-types';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    const adminRoleID = await dataSource.query(
      `SELECT id FROM roles WHERE roles.name = '${Roles.Admin}'`,
    );
    await factory(UserEntity)().create({
      name: 'Артур',
      email: 'admin@mail.ru',
      password: await bcrypt.hash('123456789', 10),
      roleId: adminRoleID[0].id,
    });
  }
}
