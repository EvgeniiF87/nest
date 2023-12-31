import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const ormconfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    type: 'postgres',
    host: config.get('TYPEORM_HOST'),
    username: config.get('FAKE_USERNAME'),
    password: config.get('FAKE_PASSWORD'),
    database: config.get('FAKE_DATABASE'),
    port: config.get('TYPEORM_PORT'),
    entities: [__dirname + 'src/**/*.entity{.ts,.js}'],
    synchronize: false,
    autoLoadEntities: true,
    logging: true,
  }),
};
