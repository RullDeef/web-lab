import { StudyGroupEntity } from '../../core/repos/typeorm/entities/study-group.entity';
import { UserEntity } from '../../core/repos/typeorm/entities/user.entity';
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
import { Card } from './card.entity';

@Entity({ name: 'decks' })
export class Deck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Card, (card: Card) => card.deck, { eager: true })
  cards: Card[];

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @ManyToMany(() => StudyGroupEntity)
  @JoinTable({
    name: 'decks_study_groups',
    joinColumn: { name: 'deck_id' },
    inverseJoinColumn: { name: 'study_group_id' },
  })
  study_groups: StudyGroupEntity[];

  @CreateDateColumn()
  created_at: Date;
}
