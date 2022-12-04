import { User } from './user.model';

export interface StudyText {
  id?: number;
  title: string;
  content: string;
  creator: User;
  created_at: Date;
}
