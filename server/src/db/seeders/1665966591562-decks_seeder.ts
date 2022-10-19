import { rand } from '@ngneat/falso';
import { UserEntity } from '../../core/repos/typeorm/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserRole } from '../../core/models/user.model';
import { DeckFactory } from '../factories/deck.factory';
import { DeckEntity } from '../../decks/repos/typeorm/entities/deck.entity';
import { CardEntity } from '../../decks/repos/typeorm/entities/card.entity';
import { CardFactory } from '../factories/card.factory';

export class decksSeeder1665966591562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const decks = await queryRunner.manager.save(
      DeckEntity,
      new DeckFactory().generate(10),
    );
    const tutors = await queryRunner.manager.find(UserEntity, {
      where: { role: UserRole.TUTOR },
    });

    for (const deck of decks) {
      deck.creator = rand(tutors);
      deck.cards = await queryRunner.manager.save(
        CardEntity,
        new CardFactory().generate(10, { deck }),
      );
      await queryRunner.manager.save(DeckEntity, deck);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('truncate table decks_study_groups, cards, decks');
  }
}
