import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuizOption } from "./quiz-option.entity";
import { QuizResult } from "./quiz-result.entity";

@Entity({ name: 'quiz_answers' })
export class QuizAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QuizResult, r => r.answers)
  @JoinColumn({ name: 'quiz_result_id' })
  quiz_result: QuizResult;

  @ManyToOne(() => QuizOption, { eager: true })
  @JoinColumn({ name: 'option_id' })
  option: QuizOption;
}