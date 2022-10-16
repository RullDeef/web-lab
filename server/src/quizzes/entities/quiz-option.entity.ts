import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuizQuestion } from "./quiz-question.entity";

@Entity({ name: 'quiz_options' })
export class QuizOption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QuizQuestion)
  @JoinColumn({ name: 'question_id' })
  question: QuizQuestion;

  @Column()
  content: string;

  @Column()
  is_correct: boolean;
}
