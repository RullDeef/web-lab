import { UserRole } from './../models/user';

export interface AuthDto {
  access_token: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    role: UserRole;
  };
}
