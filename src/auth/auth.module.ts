import { Global, Module, forwardRef } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokensModule } from 'src/tokens/tokens.module';

@Global()
@Module({
  imports: [
    forwardRef(() => UserModule),
    ConfigModule,
    TokensModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES') },
      }),
    }),
  ],
  providers: [AuthResolver, AuthService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
