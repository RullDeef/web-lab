import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { QuizzesController } from './controllers/quizzes.controller';
import { QuizRepository } from './repos/interfaces/quiz.repo';
import { QuizAnswerEntity } from './repos/typeorm/entities/quiz-answer.entity';
import { QuizOptionEntity } from './repos/typeorm/entities/quiz-option.entity';
import { QuizQuestionEntity } from './repos/typeorm/entities/quiz-question.entity';
import { QuizResultEntity } from './repos/typeorm/entities/quiz-result.entity';
import { QuizEntity } from './repos/typeorm/entities/quiz.entity';
import { TypeORMQuizRepository } from './repos/typeorm/quiz.repo';
import { QuizzesService } from './services/quizzes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuizEntity,
      QuizQuestionEntity,
      QuizOptionEntity,
      QuizResultEntity,
      QuizAnswerEntity,
    ]),
    CoreModule,
  ],
  providers: [
    {
      provide: QuizRepository,
      useClass: TypeORMQuizRepository,
    },
    QuizzesService,
  ],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
