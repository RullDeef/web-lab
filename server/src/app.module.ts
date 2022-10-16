import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { DecksModule } from './decks/decks.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DBNAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    CoreModule,
    DecksModule,
    QuizzesModule,
  ],
})
export class AppModule {}
