import { randBoolean, randSentence } from '@ngneat/falso';
import { QuizOptionEntity } from '../../quizzes/repos/typeorm/entities/quiz-option.entity';
import { BaseFactory } from './base-factory';

export class QuizOptionFactory extends BaseFactory<Partial<QuizOptionEntity>> {
  create(): Partial<QuizOptionEntity> {
    return {
      content: randSentence(),
      is_correct: randBoolean(),
    };
  }
}
