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
  login?: string;
}

export function mixedName(user: User): string {
  return `${user.last_name} ${user.first_name[0]}.`;
}

export function translateUserRole(role: UserRole): string {
  switch (role) {
    case UserRole.admin:
      return 'Администратор';
    case UserRole.tutor:
      return 'Преподаватель';
    case UserRole.student:
      return 'Студент';
  }
}
