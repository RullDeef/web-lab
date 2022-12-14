import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuizOptionEntity } from './quiz-option.entity';
import { QuizResultEntity } from './quiz-result.entity';

@Entity({ name: 'quiz_answers' })
export class QuizAnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QuizResultEntity, (r) => r.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quiz_result_id' })
  quiz_result: QuizResultEntity;

  @ManyToOne(() => QuizOptionEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'option_id' })
  option: QuizOptionEntity;
}
