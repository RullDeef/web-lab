import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudyGroup } from '../../core/entities/study-group.entity';
import { User } from '../../core/entities/user.entity';
import { Card } from './card.entity';

@Entity({ name: 'decks' })
export class Deck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Card, (card: Card) => card.deck, { eager: true })
  cards: Card[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @ManyToMany(() => StudyGroup)
  @JoinTable({
    name: 'decks_study_groups',
    joinColumn: { name: 'deck_id' },
    inverseJoinColumn: { name: 'study_group_id' },
  })
  study_groups: StudyGroup[];

  @CreateDateColumn()
  created_at: Date;
}
