import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizOption } from './quiz-option.entity';
import { Quiz } from './quiz.entity';

@Entity({ name: 'quiz_questions' })
export class QuizQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Quiz)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @Column()
  question: string;

  @OneToMany(() => QuizOption, (o) => o.question, { eager: true })
  options: QuizOption[];
}
