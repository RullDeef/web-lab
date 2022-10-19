import { randWord } from '@ngneat/falso';
import { DeckEntity } from '../../decks/repos/typeorm/entities/deck.entity';
import { BaseFactory } from './base-factory';

export class DeckFactory extends BaseFactory<Partial<DeckEntity>> {
  create(): Partial<DeckEntity> {
    return {
      title: randWord() + randWord(),
    };
  }
}
