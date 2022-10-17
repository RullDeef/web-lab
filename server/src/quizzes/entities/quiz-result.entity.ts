import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../core/entities/user.entity';
import { QuizAnswer } from './quiz-answer.entity';
import { Quiz } from './quiz.entity';

@Entity({ name: 'quiz_results' })
export class QuizResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Quiz)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'student_id' })
  student: User;

  @OneToMany(() => QuizAnswer, (q) => q.quiz_result, { eager: true })
  answers: QuizAnswer;

  @Column()
  score: number;

  @CreateDateColumn()
  created_at: Date;
}
