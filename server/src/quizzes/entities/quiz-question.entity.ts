import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuizOption } from "./quiz-option.entity";
import { Quiz } from "./quiz.entity";

@Entity({ name: 'quiz_questions' })
export class QuizQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Quiz)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @Column()
  question: string;

  @OneToMany(() => QuizOption, o => o.question)
  options: QuizOption[];
}
