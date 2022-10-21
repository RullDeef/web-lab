import { UserRole } from './../models/user';

export interface UserDto {
  id: number;

  first_name: string;
  last_name: string;

  role: UserRole;
}
