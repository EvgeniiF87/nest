import { Roles } from 'src/role/role-types';
import { DataSource } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

// TODO создать несколько пользователей с одинаковым паролем

export default class UserCreateEventsPlaces implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    const userRoleID = await dataSource.query(
      `SELECT id FROM roles WHERE roles.name = '${Roles.User}'`,
    );
    const usersID = await dataSource.query(
      `SELECT id FROM users WHERE users."roleId" = ${userRoleID[0].id}`,
    );
  }
}
