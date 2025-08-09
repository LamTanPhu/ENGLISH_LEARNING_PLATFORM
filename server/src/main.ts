import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from './config/logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  const configService = app.get(ConfigService);
  app.enableCors();
  await app.listen(configService.get<number>('PORT', 3000));
}
bootstrap();