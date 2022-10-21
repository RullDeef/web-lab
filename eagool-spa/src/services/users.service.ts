import { Axios } from "axios";
import { User } from "../models/user";

export class UsersService {
    constructor(
        private readonly axios: Axios,
    ) {}

    async getAll(): Promise<User[]> {
        const result = await this.axios.get<User[]>('/users');

        return result.data;
    }
}
