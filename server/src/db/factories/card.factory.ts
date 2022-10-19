import { randWord } from '@ngneat/falso';
import { CardEntity } from '../../decks/repos/typeorm/entities/card.entity';
import { BaseFactory } from './base-factory';

export class CardFactory extends BaseFactory<Partial<CardEntity>> {
  create(): Partial<CardEntity> {
    return {
      word: randWord(),
      reading: `[${randWord()}]`,
      translation: randWord(),
    };
  }
}
