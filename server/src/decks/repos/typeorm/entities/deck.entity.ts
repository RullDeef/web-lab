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
import { StudyGroupEntity } from '../../../../core/repos/typeorm/entities/study-group.entity';
import { UserEntity } from '../../../../core/repos/typeorm/entities/user.entity';
import { Deck } from '../../../models/deck.model';
import { CardEntity } from './card.entity';

@Entity({ name: 'decks' })
export class DeckEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => CardEntity, (CardEntity: CardEntity) => CardEntity.deck, {
    eager: true,
  })
  cards: CardEntity[];

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

  toModel(): Deck {
    const deck = new Deck();

    deck.id = this.id;
    deck.title = this.title;
    deck.creator = this.creator.toModel();
    deck.cards = this.cards.map((c) => c.toModel());
    deck.study_groups = this.study_groups?.map((g) => g.toModel()) ?? [];
    deck.created_at = this.created_at;

    return deck;
  }

  static fromModel(deck: Deck) {
    const ent = new DeckEntity();

    ent.id = deck.id;
    ent.title = deck.title;
    ent.creator = UserEntity.fromModel(deck.creator);
    ent.cards = deck.cards.map(CardEntity.fromModel);
    ent.study_groups = deck.study_groups.map(StudyGroupEntity.fromModel);
    ent.created_at = deck.created_at;

    return ent;
  }
}
