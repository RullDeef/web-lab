import { LocalStorageService } from './local-storage.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiServer}/auth`;
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  private token?: string;
  private user?: User;

  constructor(private http: HttpClient, private storage: LocalStorageService) {
    if (this.storage.hasItem('access_token')) {
      this.token = this.storage.getItem('access_token');
      this.user = JSON.parse(this.storage.getItem('user'));
    }
  }

  login(login: string, password: string) {
    const url = `${this.apiUrl}/login`;
    return this.http.post<any>(url, { login, password }, this.options).pipe(
      map((response: any) => {
        this.token = response.access_token;
        this.user = response.user;

        this.storage.setItem('access_token', response.access_token);
        this.storage.setItem('user', JSON.stringify(response.user));
        return true;
      })
    );
  }

  logout() {
    this.token = undefined;
    this.user = undefined;
    this.storage.removeItem('access_token');
    this.storage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return this.token !== undefined;
  }

  getAuthorizationToken(): string {
    if (this.token === undefined) throw new Error('Not authorized');
    return this.token;
  }

  getThisUser(): User {
    if (this.user === undefined) throw new Error('Not authorized');
    return this.user;
  }
}
