import { join } from 'path';
import { config } from 'dotenv';

config({ path: join(process.cwd(), '.env') });

const options = {
  type: 'postgres',
  host: '127.0.0.1',
  schema: 'public',
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  database: process.env.TYPEORM_DATABASE,
  password: process.env.TYPEORM_PASSWORD,
  // username: process.env.FAKE_USERNAME,
  // database: process.env.FAKE_DATABASE,
  // password: process.env.FAKE_PASSWORD,
  entities: ['dist/**/entities/*.entity.{js,ts}'],
  factories: ['dist/database/factories/**/*.js'],
  seeds: ['dist/database/seeds/**/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: false,
  logging: true,
};

export default options;
