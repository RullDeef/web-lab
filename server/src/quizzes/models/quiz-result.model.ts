import { User } from '../../core/models/user.model';

export class QuizResult {
  id?: number;
  student: User;
  answers: Map<number, number[]>;
  score: number;
  created_at: Date;
}
