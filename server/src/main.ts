import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'verbose', 'log']
  });
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
