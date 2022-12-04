import { User } from './user.model';

export interface StudyGroup {
  id?: number;
  title: string;
  tutor: User;
  students: User[];
  created_at?: Date;
}
