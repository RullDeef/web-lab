import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from '../../../models/card.model';
import { DeckEntity } from './deck.entity';

@Entity({ name: 'cards' })
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DeckEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'deck_id' })
  deck: DeckEntity;

  @Column()
  word: string;

  @Column()
  reading: string;

  @Column()
  translation: string;

  toModel(): Card {
    const card = new Card();

    card.id = this.id;
    card.word = this.word;
    card.reading = this.reading;
    card.translation = this.translation;

    return card;
  }

  static fromModel(card: Card) {
    const ent = new CardEntity();

    ent.id = card.id;
    ent.word = card.word;
    ent.reading = card.reading;
    ent.translation = card.translation;

    return ent;
  }
}
