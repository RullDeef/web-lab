import { EditUserDto } from './../dto/edit.user.dto';
import { RegisterUserDto } from './../dto/register.user.dto';
import { Axios } from 'axios';
import { User } from '../models/user';

export class UsersService {
  private readonly pageSize: number = 10;

  constructor(private readonly axios: Axios) {}

  async getAll(): Promise<User[]> {
    const result = await this.axios.get<User[]>('/users');
    return result.data;
  }

  async getAllPaged(page: number) {
    const skip = page * this.pageSize;
    const limit = this.pageSize;
    const result = await this.axios.get<User[]>(
      `/users?skip=${skip}&limit=${limit}`,
    );
    return result.data;
  }

  async registerUser(dto: RegisterUserDto) {
    const result = await this.axios.post<any>('/users', dto);
    console.log(result);
  }

  async deleteUser(id: number) {
    const result = await this.axios.delete(`/users/${id}`);
    console.log(result);
  }

  async editUser(id: number, dto: EditUserDto) {
    const result = await this.axios.put(`/users/${id}`, dto);
    console.log(result);
  }
}
