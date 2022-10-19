import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizOption } from '../../../models/quiz-option.model';
import { QuizQuestionEntity } from './quiz-question.entity';

@Entity({ name: 'quiz_options' })
export class QuizOptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QuizQuestionEntity)
  @JoinColumn({ name: 'question_id' })
  question: QuizQuestionEntity;

  @Column()
  content: string;

  @Column()
  is_correct: boolean;

  toModel(): QuizOption {
    const opt = new QuizOption();

    opt.id = this.id;
    opt.content = this.content;
    opt.is_correct = this.is_correct;

    return opt;
  }

  static fromModel(opt: QuizOption) {
    const entity = new QuizOptionEntity();

    entity.id = opt.id;
    entity.content = opt.content;
    entity.is_correct = opt.is_correct;

    return entity;
  }
}
