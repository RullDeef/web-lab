import { User } from './user';

export interface StudyGroup {
  id: number;
  title: string;
  tutor: User;
  students: User[];
}
