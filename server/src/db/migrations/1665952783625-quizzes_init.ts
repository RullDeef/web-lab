import { MigrationInterface, QueryRunner } from "typeorm";

export class quizzesInit1665952783625 implements MigrationInterface {
    name = 'quizzesInit1665952783625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quizzes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, CONSTRAINT "PK_b24f0f7662cf6b3a0e7dba0a1b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz_questions" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "quiz_id" integer, CONSTRAINT "PK_ec0447fd30d9f5c182e7653bfd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz_options" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "is_correct" boolean NOT NULL, "question_id" integer, CONSTRAINT "PK_9c59607f100085ab17f0f138926" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz_results" ("id" SERIAL NOT NULL, "score" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "quiz_id" integer, "student_id" integer, CONSTRAINT "PK_4ecf38c5bf5b054ccc9f10e438a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz_answers" ("id" SERIAL NOT NULL, "quiz_result_id" integer, "option_id" integer, CONSTRAINT "PK_3fefbc8a840a41b6a15a4f9ca5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "study_groups_quizzes" ("study_group_id" integer NOT NULL, "quiz_id" integer NOT NULL, CONSTRAINT "PK_94c0ba15e48996aba70437bb7d2" PRIMARY KEY ("study_group_id", "quiz_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4261c10b6fda3371a697d9dd3c" ON "study_groups_quizzes" ("study_group_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f3d29af8a9a95c8e441b091297" ON "study_groups_quizzes" ("quiz_id") `);
        await queryRunner.query(`ALTER TABLE "quizzes" ADD CONSTRAINT "FK_415fa0f36f70c345fc59ec9474e" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_questions" ADD CONSTRAINT "FK_14c6d2b8f5be0bdb406a3895bb4" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_options" ADD CONSTRAINT "FK_2aa44934a4602aef1ede068f4a7" FOREIGN KEY ("question_id") REFERENCES "quiz_questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_results" ADD CONSTRAINT "FK_a5e1e00cb1e36eec2dfa2c21065" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_results" ADD CONSTRAINT "FK_28848f36ed7c878f3d8dd754375" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_answers" ADD CONSTRAINT "FK_642006690f441472f3d7b6b3059" FOREIGN KEY ("quiz_result_id") REFERENCES "quiz_results"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_answers" ADD CONSTRAINT "FK_9891b14a7212c6271f40f70a786" FOREIGN KEY ("option_id") REFERENCES "quiz_options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "study_groups_quizzes" ADD CONSTRAINT "FK_4261c10b6fda3371a697d9dd3c1" FOREIGN KEY ("study_group_id") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "study_groups_quizzes" ADD CONSTRAINT "FK_f3d29af8a9a95c8e441b0912971" FOREIGN KEY ("quiz_id") REFERENCES "study_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "study_groups_quizzes" DROP CONSTRAINT "FK_f3d29af8a9a95c8e441b0912971"`);
        await queryRunner.query(`ALTER TABLE "study_groups_quizzes" DROP CONSTRAINT "FK_4261c10b6fda3371a697d9dd3c1"`);
        await queryRunner.query(`ALTER TABLE "quiz_answers" DROP CONSTRAINT "FK_9891b14a7212c6271f40f70a786"`);
        await queryRunner.query(`ALTER TABLE "quiz_answers" DROP CONSTRAINT "FK_642006690f441472f3d7b6b3059"`);
        await queryRunner.query(`ALTER TABLE "quiz_results" DROP CONSTRAINT "FK_28848f36ed7c878f3d8dd754375"`);
        await queryRunner.query(`ALTER TABLE "quiz_results" DROP CONSTRAINT "FK_a5e1e00cb1e36eec2dfa2c21065"`);
        await queryRunner.query(`ALTER TABLE "quiz_options" DROP CONSTRAINT "FK_2aa44934a4602aef1ede068f4a7"`);
        await queryRunner.query(`ALTER TABLE "quiz_questions" DROP CONSTRAINT "FK_14c6d2b8f5be0bdb406a3895bb4"`);
        await queryRunner.query(`ALTER TABLE "quizzes" DROP CONSTRAINT "FK_415fa0f36f70c345fc59ec9474e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f3d29af8a9a95c8e441b091297"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4261c10b6fda3371a697d9dd3c"`);
        await queryRunner.query(`DROP TABLE "study_groups_quizzes"`);
        await queryRunner.query(`DROP TABLE "quiz_answers"`);
        await queryRunner.query(`DROP TABLE "quiz_results"`);
        await queryRunner.query(`DROP TABLE "quiz_options"`);
        await queryRunner.query(`DROP TABLE "quiz_questions"`);
        await queryRunner.query(`DROP TABLE "quizzes"`);
    }

}
