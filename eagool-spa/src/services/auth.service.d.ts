import { User } from './../models/user';
import { Axios } from 'axios';
export declare class AuthService {
    private readonly axios;
    private access_token?;
    private user?;
    constructor(axios: Axios);
    auth(login: string, password: string): Promise<void>;
    logout(): void;
    isAuthorized(): boolean;
    getUser(): User;
}
