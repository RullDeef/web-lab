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

  @ManyToOne(() => QuizEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quiz_id' })
  quiz: QuizEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student: UserEntity;

  @OneToMany(() => QuizAnswerEntity, (q) => q.quiz_result, { eager: true, onDelete: 'CASCADE' })
  answers: QuizAnswerEntity;

  @Column()
  score: number;

  @CreateDateColumn()
  created_at: Date;
}
