import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { DecksModule } from './decks/decks.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'eagool',
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
