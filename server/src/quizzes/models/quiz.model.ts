import { StudyGroup } from '../../core/models/study-group.model';
import { User } from '../../core/models/user.model';
import { QuizQuestion } from './quiz-quiestion.model';

export class Quiz {
  id?: number;
  title: string;
  creator: User;
  questions: QuizQuestion[];
  study_groups: StudyGroup[];
  created_at: Date;
}
