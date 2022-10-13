import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { DecksModule } from './decks/decks.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';

import { join } from 'path';
import { config } from 'dotenv';
config({ path: join(__dirname, 'dev.env') });

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: 'dev.env',
    //   isGlobal: true
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DBNAME,
      autoLoadEntities: true,
      synchronize: false
    }),
    CoreModule,
    DecksModule,
    QuizzesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
