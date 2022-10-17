import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { QuizzesController } from './controllers/quizzes.controller';
import { QuizAnswer } from './entities/quiz-answer.entity';
import { QuizOption } from './entities/quiz-option.entity';
import { QuizQuestion } from './entities/quiz-question.entity';
import { QuizResult } from './entities/quiz-result.entity';
import { Quiz } from './entities/quiz.entity';
import { QuizzesService } from './services/quizzes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quiz,
      QuizQuestion,
      QuizOption,
      QuizResult,
      QuizAnswer,
    ]),
    CoreModule,
  ],
  providers: [QuizzesService],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
