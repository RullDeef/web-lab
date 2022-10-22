import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizQuestion } from '../../../models/quiz-quiestion.model';
import { QuizOptionEntity } from './quiz-option.entity';
import { QuizEntity } from './quiz.entity';

@Entity({ name: 'quiz_questions' })
export class QuizQuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QuizEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quiz_id' })
  quiz: QuizEntity;

  @Column()
  question: string;

  @OneToMany(() => QuizOptionEntity, (o) => o.question, { eager: true, onDelete: 'CASCADE' })
  options: QuizOptionEntity[];

  toModel(): QuizQuestion {
    const question = new QuizQuestion();

    question.id = this.id;
    question.question = this.question;
    question.options = this.options.map((o) => o.toModel());

    return question;
  }

  static fromModel(question: QuizQuestion) {
    const entity = new QuizQuestionEntity();

    entity.id = question.id;
    entity.question = question.question;
    entity.options = question.options.map(QuizOptionEntity.fromModel);

    return entity;
  }
}
