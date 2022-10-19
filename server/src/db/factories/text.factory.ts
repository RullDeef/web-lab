import { randParagraph, randSentence } from '@ngneat/falso';
import { StudyTextEntity } from '../../core/repos/typeorm/entities/study-text.entity';
import { BaseFactory } from './base-factory';

export class StudyTextFactory extends BaseFactory<Partial<StudyTextEntity>> {
  create(): Partial<StudyTextEntity> {
    return {
      title: randSentence(),
      content: randParagraph(),
    };
  }
}
