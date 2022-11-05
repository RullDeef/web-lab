import { EditUserDto } from './../dto/edit.user.dto';
import { RegisterUserDto } from './../dto/register.user.dto';
import { Axios } from 'axios';
import { User } from '../models/user';
export declare class UsersService {
    private readonly axios;
    private readonly pageSize;
    constructor(axios: Axios);
    getAll(): Promise<User[]>;
    getAllPaged(page: number): Promise<User[]>;
    registerUser(dto: RegisterUserDto): Promise<void>;
    deleteUser(id: number): Promise<void>;
    editUser(id: number, dto: EditUserDto): Promise<void>;
}
