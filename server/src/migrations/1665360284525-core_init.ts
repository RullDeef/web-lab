import { MigrationInterface, QueryRunner } from "typeorm";

export class coreInit1665360284525 implements MigrationInterface {
    name = 'coreInit1665360284525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_roles" AS ENUM('admin', 'tutor', 'student')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "role" "public"."user_roles" NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "study_groups" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "tutor_id" integer, CONSTRAINT "REL_e3ac0a4eb7d61c4e82115fa86e" UNIQUE ("tutor_id"), CONSTRAINT "PK_d3c236286b727d74553c7a88dc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "texts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ce044efbc0a1872f20feca7e19f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "study_groups_users" ("group_id" integer NOT NULL, "student_id" integer NOT NULL, CONSTRAINT "PK_8fc745d5bb7f6f86b488a1ab41f" PRIMARY KEY ("group_id", "student_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a61bf7c64f54dd642599528ff3" ON "study_groups_users" ("group_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c426eeec85e294917ea457f8cf" ON "study_groups_users" ("student_id") `);
        await queryRunner.query(`ALTER TABLE "study_groups" ADD CONSTRAINT "FK_e3ac0a4eb7d61c4e82115fa86e7" FOREIGN KEY ("tutor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "study_groups_users" ADD CONSTRAINT "FK_a61bf7c64f54dd642599528ff37" FOREIGN KEY ("group_id") REFERENCES "study_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "study_groups_users" ADD CONSTRAINT "FK_c426eeec85e294917ea457f8cfd" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "study_groups_users" DROP CONSTRAINT "FK_c426eeec85e294917ea457f8cfd"`);
        await queryRunner.query(`ALTER TABLE "study_groups_users" DROP CONSTRAINT "FK_a61bf7c64f54dd642599528ff37"`);
        await queryRunner.query(`ALTER TABLE "study_groups" DROP CONSTRAINT "FK_e3ac0a4eb7d61c4e82115fa86e7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c426eeec85e294917ea457f8cf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a61bf7c64f54dd642599528ff3"`);
        await queryRunner.query(`DROP TABLE "study_groups_users"`);
        await queryRunner.query(`DROP TABLE "texts"`);
        await queryRunner.query(`DROP TABLE "study_groups"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."user_roles"`);
    }

}
