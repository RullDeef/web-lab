import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'verbose', 'log'],
  });
  app.setGlobalPrefix('api/v1');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle(
      'Система контроля выполнения домашних заданий по дисциплине "английский язык"',
    )
    .setVersion('0.0.1')
    .addBearerAuth(
      //{
      //description: 'JWT токен для авторизации',
      //}
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1', app, document);

  await app.listen(parseInt(process.env.PORT));
}

bootstrap();
