import { User } from './../models/user';
import { AuthDto } from './../dto/auth.dto';
import { Axios } from 'axios';

export class AuthService {
  private access_token?: string;
  private user?: User;

  constructor(private readonly axios: Axios) {}

  async auth(login: string, password: string): Promise<void> {
    const result = await this.axios.post<AuthDto>('/auth/login', {
      login,
      password,
    });

    this.access_token = result.data.access_token;
    this.axios.defaults.headers.common.Authorization = `Bearer ${this.access_token}`;

    this.user = result.data.user;
  }

  logout() {
    this.axios.defaults.headers.common.Authorization = undefined;
    this.access_token = undefined;
    this.user = undefined;
  }

  isAuthorized(): boolean {
    return this.access_token !== undefined;
  }

  getUser(): User {
    if (this.user == null) {
      console.error('unautorised');
      throw new Error();
    }
    return { ...this.user };
  }
}
