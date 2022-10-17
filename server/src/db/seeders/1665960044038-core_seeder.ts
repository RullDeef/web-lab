import { rand } from "@ngneat/falso";
import { text } from "stream/consumers";
import { MigrationInterface, QueryRunner } from "typeorm"
import { StudyGroup } from "../../core/entities/study-group.entity";
import { StudyText } from "../../core/entities/study-text.entity";
import { User, UserRole } from "../../core/entities/user.entity";
import { StudyGroupFactory } from "../factories/group.factory";
import { StudyTextFactory } from "../factories/text.factory";
import { UserFactory } from "../factories/user.factory";

export class coreSeeder1665960044038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // create admin account
        await queryRunner.manager.save(User, {
            first_name: 'admin',
            last_name: 'adminovich',
            login: 'admin',
            password: 'admin',
            role: UserRole.ADMIN,
        } as Partial<User>);

        const tutors = new UserFactory().generate(100, {
            role: UserRole.TUTOR,
        });
        const students = new UserFactory().generate(2000, {
            role: UserRole.STUDENT,
        })

        const users = tutors.concat(students);
        const saved_users = await queryRunner.manager.save(User, users);
        const saved_tutors = saved_users.filter(u => u.role == UserRole.TUTOR);
        let saved_students = saved_users.filter(u => u.role == UserRole.STUDENT);
        
        let texts = new StudyTextFactory().generate(400);
        texts = await queryRunner.manager.save(StudyText, texts);
        for (let text of texts)
            text.creator = rand(saved_tutors);
        await queryRunner.manager.save(StudyText, texts);

        let groups = new StudyGroupFactory().generate(200);
        let saved_groups = await queryRunner.manager.save(StudyGroup, groups);

        for (let group of saved_groups) {
            group.tutor = rand(saved_tutors);
            group.students = [];
            for (let i = 0; i < 10; i++)
                group.students.push(saved_students.pop());
        }

        await queryRunner.manager.save(StudyGroup, saved_groups);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("truncate table study_groups_texts");
        await queryRunner.query("truncate table texts");
        await queryRunner.query("truncate table study_groups_users");
        await queryRunner.query("truncate table study_groups");
        await queryRunner.query("truncate table users");
    }
}
