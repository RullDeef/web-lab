import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Deck } from './deck.entity';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Deck)
  @JoinColumn({ name: 'deck_id' })
  deck: Deck;

  @Column()
  word: string;

  @Column()
  reading: string;

  @Column()
  translation: string;
}
