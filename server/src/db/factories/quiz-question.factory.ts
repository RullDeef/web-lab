import { randSentence } from '@ngneat/falso';
import { QuizQuestionEntity } from '../../quizzes/repos/typeorm/entities/quiz-question.entity';
import { BaseFactory } from './base-factory';

export class QuizQuestionFactory extends BaseFactory<
  Partial<QuizQuestionEntity>
> {
  create(): Partial<QuizQuestionEntity> {
    return {
      question: randSentence(),
    };
  }
}
