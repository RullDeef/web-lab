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
import { Quiz } from '../../../models/quiz.model';
import { QuizQuestionEntity } from './quiz-question.entity';

@Entity({ name: 'quizzes' })
export class QuizEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @OneToMany(() => QuizQuestionEntity, (q) => q.quiz, { eager: true })
  questions: QuizQuestionEntity[];

  @ManyToMany(() => StudyGroupEntity)
  @JoinTable({
    name: 'study_groups_quizzes',
    joinColumn: { name: 'study_group_id' },
    inverseJoinColumn: { name: 'quiz_id' },
  })
  study_groups: StudyGroupEntity[];

  @CreateDateColumn()
  created_at: Date;

  toModel(): Quiz {
    const quiz = new Quiz();

    quiz.id = this.id;
    quiz.title = this.title;
    quiz.creator = this.creator.toModel();
    quiz.questions = this.questions.map((q) => q.toModel());
    quiz.study_groups = this.study_groups?.map((g) => g.toModel()) ?? [];
    quiz.created_at = this.created_at;

    return quiz;
  }

  static fromModel(quiz: Quiz) {
    const entity = new QuizEntity();

    entity.id = quiz.id;
    entity.title = quiz.title;
    entity.creator = UserEntity.fromModel(quiz.creator);
    entity.questions = quiz.questions.map(QuizQuestionEntity.fromModel);
    entity.study_groups = quiz.study_groups.map(StudyGroupEntity.fromModel);
    entity.created_at = quiz.created_at;

    return entity;
  }
}
