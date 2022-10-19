import { randSentence } from '@ngneat/falso';
import { QuizEntity } from '../../quizzes/repos/typeorm/entities/quiz.entity';
import { BaseFactory } from './base-factory';

export class QuizFactory extends BaseFactory<Partial<QuizEntity>> {
  create(): Partial<QuizEntity> {
    return {
      title: randSentence(),
    };
  }
}
