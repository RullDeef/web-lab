import { randWord } from '@ngneat/falso';
import { Deck } from '../../decks/entities/deck.entity';
import { BaseFactory } from './base-factory';

export class DeckFactory extends BaseFactory<Partial<Deck>> {
  create(): Partial<Deck> {
    return {
      title: randWord() + randWord(),
    };
  }
}
