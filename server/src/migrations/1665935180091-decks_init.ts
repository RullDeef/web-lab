import { MigrationInterface, QueryRunner } from "typeorm";

export class decksInit1665935180091 implements MigrationInterface {
    name = 'decksInit1665935180091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "decks" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, CONSTRAINT "REL_6128598bf9fe3ec07527f8e422" UNIQUE ("creator_id"), CONSTRAINT "PK_981894e3f8dbe5049ac59cb1af1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" SERIAL NOT NULL, "word" character varying NOT NULL, "reading" character varying NOT NULL, "translation" character varying NOT NULL, "deck_id" integer, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "decks_study_groups" ("deck_id" integer NOT NULL, "study_group_id" integer NOT NULL, CONSTRAINT "PK_b04b0cf030ed586c70f3aeeb9dd" PRIMARY KEY ("deck_id", "study_group_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5e49a236a99f6a02b1ec500f43" ON "decks_study_groups" ("deck_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f05339758d50b7e448ac2ff402" ON "decks_study_groups" ("study_group_id") `);
        await queryRunner.query(`ALTER TABLE "decks" ADD CONSTRAINT "FK_6128598bf9fe3ec07527f8e4226" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_48b7cc51062cec29514e72b27b9" FOREIGN KEY ("deck_id") REFERENCES "decks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "decks_study_groups" ADD CONSTRAINT "FK_5e49a236a99f6a02b1ec500f430" FOREIGN KEY ("deck_id") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "decks_study_groups" ADD CONSTRAINT "FK_f05339758d50b7e448ac2ff4027" FOREIGN KEY ("study_group_id") REFERENCES "study_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "decks_study_groups" DROP CONSTRAINT "FK_f05339758d50b7e448ac2ff4027"`);
        await queryRunner.query(`ALTER TABLE "decks_study_groups" DROP CONSTRAINT "FK_5e49a236a99f6a02b1ec500f430"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_48b7cc51062cec29514e72b27b9"`);
        await queryRunner.query(`ALTER TABLE "decks" DROP CONSTRAINT "FK_6128598bf9fe3ec07527f8e4226"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f05339758d50b7e448ac2ff402"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5e49a236a99f6a02b1ec500f43"`);
        await queryRunner.query(`DROP TABLE "decks_study_groups"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "decks"`);
    }

}
