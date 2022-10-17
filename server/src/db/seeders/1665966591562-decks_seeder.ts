import { rand } from "@ngneat/falso";
import { MigrationInterface, QueryRunner } from "typeorm"
import { User, UserRole } from "../../core/entities/user.entity";
import { Card } from "../../decks/entities/card.entity";
import { Deck } from "../../decks/entities/deck.entity";
import { CardFactory } from "../factories/card.factory";
import { DeckFactory } from "../factories/deck.factory"

export class decksSeeder1665966591562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const decks = await queryRunner.manager.save(Deck, new DeckFactory().generate(100));
        const tutors = await queryRunner.manager.find(User, { where: { role: UserRole.TUTOR } })

        for (let deck of decks) {
            deck.creator = rand(tutors);
            deck.cards = await queryRunner.manager.save(Card, new CardFactory().generate(10, { deck }));
            await queryRunner.manager.save(Deck, deck);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("truncate table decks_study_groups");
        await queryRunner.query("truncate table cards");
        await queryRunner.query("truncate table decks");
    }
}
