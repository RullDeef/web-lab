import { User } from './user.model';

export class StudyText {
  id?: number;
  title: string;
  content: string;
  creator: User;
  created_at: Date;
}
