import { rand } from '@ngneat/falso';
import { UserEntity } from '../../core/repos/typeorm/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserRole } from '../../core/models/user.model';
import { QuizOption } from '../../quizzes/entities/quiz-option.entity';
import { QuizQuestion } from '../../quizzes/entities/quiz-question.entity';
import { Quiz } from '../../quizzes/entities/quiz.entity';
import { QuizOptionFactory } from '../factories/quiz-option.factory';
import { QuizQuestionFactory } from '../factories/quiz-question.factory';
import { QuizFactory } from '../factories/quiz.factory';

export class quizzesSeeder1665967099163 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tutors = await queryRunner.manager.find(UserEntity, {
      where: { role: UserRole.TUTOR },
    });

    const quizzes = await queryRunner.manager.save(
      Quiz,
      new QuizFactory().generate(200),
    );
    for (const quiz of quizzes) {
      quiz.creator = rand(tutors);
      quiz.questions = await queryRunner.manager.save(
        QuizQuestion,
        new QuizQuestionFactory().generate(10),
      );
      for (const quest of quiz.questions) {
        quest.options = await queryRunner.manager.save(
          QuizOption,
          new QuizOptionFactory().generate(4, {
            question: quest,
          }),
        );
      }
    }
    await queryRunner.manager.save(Quiz, quizzes);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'truncate table study_groups_quizzes, quiz_answers, quiz_results, quiz_options, quiz_questions, quizzes',
    );
  }
}
