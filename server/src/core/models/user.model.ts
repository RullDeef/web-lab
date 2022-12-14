export enum UserRole {
  ADMIN = 'admin',
  TUTOR = 'tutor',
  STUDENT = 'student',
}

export class User {
  id?: number;

  first_name: string;
  last_name: string;

  role: UserRole;

  login: string;
  password: string;
}
