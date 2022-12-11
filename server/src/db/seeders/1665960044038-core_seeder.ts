import { rand } from '@ngneat/falso';
import { hash } from 'bcrypt';
import { UserRole } from '../../core/models/user.model';
import { StudyGroupEntity } from '../../core/repos/typeorm/entities/study-group.entity';
import { StudyTextEntity } from '../../core/repos/typeorm/entities/study-text.entity';
import { UserEntity } from '../../core/repos/typeorm/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { StudyGroupFactory } from '../factories/group.factory';
import { StudyTextFactory } from '../factories/text.factory';
import { UserFactory } from '../factories/user.factory';

export class coreSeeder1665960044038 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // create admin account
    await queryRunner.manager.save(UserEntity, {
      first_name: 'admin',
      last_name: 'adminovich',
      login: 'admin',
      password: await hash('admin', 10),
      role: UserRole.ADMIN,
    } as Partial<UserEntity>);

    // create user account
    await queryRunner.manager.save(UserEntity, {
      first_name: 'user',
      last_name: 'userovich',
      login: 'user',
      password: await hash('user123', 10),
      role: UserRole.STUDENT,
    } as Partial<UserEntity>);

    // create teacher account
    await queryRunner.manager.save(UserEntity, {
      first_name: 'teacher',
      last_name: 'teacherovich',
      login: 'teacher',
      password: await hash('teacher', 10),
      role: UserRole.TUTOR,
    } as Partial<UserEntity>);

    const tutors = new UserFactory().generate(10, {
      role: UserRole.TUTOR,
    });
    const students = new UserFactory().generate(200, {
      role: UserRole.STUDENT,
    });

    const users = tutors.concat(students);
    const saved_users = await queryRunner.manager.save(UserEntity, users);
    const saved_tutors = saved_users.filter((u) => u.role == UserRole.TUTOR);
    const saved_students = saved_users.filter(
      (u) => u.role == UserRole.STUDENT,
    );

    let texts = new StudyTextFactory().generate(40);
    texts = await queryRunner.manager.save(StudyTextEntity, texts);
    for (const text of texts) text.creator = rand(saved_tutors);
    await queryRunner.manager.save(StudyTextEntity, texts);

    const groups = new StudyGroupFactory().generate(20);
    const saved_groups = await queryRunner.manager.save(
      StudyGroupEntity,
      groups,
    );

    for (const group of saved_groups) {
      group.tutor = rand(saved_tutors);
      group.students = [];
      for (let i = 0; i < 10; i++) group.students.push(saved_students.pop());
    }

    await queryRunner.manager.save(StudyGroupEntity, saved_groups);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'truncate table texts, study_groups_users, study_groups, users cascade',
    );
  }
}
