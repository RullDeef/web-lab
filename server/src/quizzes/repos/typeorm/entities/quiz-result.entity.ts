import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../../../core/repos/typeorm/entities/user.entity';
import { QuizAnswerEntity } from './quiz-answer.entity';
import { QuizEntity } from './quiz.entity';

@Entity({ name: 'quiz_results' })
export class QuizResultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QuizEntity)
  @JoinColumn({ name: 'quiz_id' })
  quiz: QuizEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  student: UserEntity;

  @OneToMany(() => QuizAnswerEntity, (q) => q.quiz_result, { eager: true })
  answers: QuizAnswerEntity;

  @Column()
  score: number;

  @CreateDateColumn()
  created_at: Date;
}
