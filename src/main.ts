import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InputValidationPipe } from './pipe/input.validation';
import * as cookieParser from 'cookie-parser';

//TODO создать модуль по cron задачам
//TODO создать сущность для статистики просмотров событий и мест клиента

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new InputValidationPipe());
  app.use(cookieParser());
  app.enableCors({ origin: true, credentials: true });
  await app.listen(3000);
}
bootstrap();
