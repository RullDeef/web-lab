import { UserEntity } from '../../core/repos/typeorm/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizAnswer } from './quiz-answer.entity';
import { Quiz } from './quiz.entity';

@Entity({ name: 'quiz_results' })
export class QuizResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Quiz)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  student: UserEntity;

  @OneToMany(() => QuizAnswer, (q) => q.quiz_result, { eager: true })
  answers: QuizAnswer;

  @Column()
  score: number;

  @CreateDateColumn()
  created_at: Date;
}
