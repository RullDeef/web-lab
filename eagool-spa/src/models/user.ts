export enum UserRole {
  admin = 'admin',
  tutor = 'tutor',
  student = 'student',
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;

  role: UserRole;
}
