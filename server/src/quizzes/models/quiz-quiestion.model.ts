import { QuizOption } from './quiz-option.model';

export class QuizQuestion {
  id?: number;
  question: string;
  options: QuizOption[];
}
