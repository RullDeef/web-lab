import { UserRole } from './../models/user';
export interface EditUserDto {
    id: number;
    first_name: string;
    last_name: string;
    role: UserRole;
    login: string;
    password: string;
}
