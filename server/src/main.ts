import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { createServer, Server, ServerOptions } from 'spdy';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestApplicationOptions } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const expressApp = express();
  const spdyOpts: ServerOptions = {
    key: fs.readFileSync('./cert/server.key'),
    cert: fs.readFileSync('./cert/server.crt'),
  }
  const server: Server = createServer(spdyOpts, expressApp)

  const httpAdapter = new ExpressAdapter(expressApp);
  const extraOpts: NestApplicationOptions = {
    logger: ['error', 'warn', 'verbose', 'log'],
  }
  const app = await NestFactory.create(AppModule, httpAdapter, extraOpts);
  app.setGlobalPrefix('api/v1');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle(
      'Система контроля выполнения домашних заданий по дисциплине "английский язык"',
    )
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1', app, document);

  await app.init();
  await server.listen(parseInt(process.env.PORT));
}

bootstrap();
