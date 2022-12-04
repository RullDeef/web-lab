import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from './../../environments/environment';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.apiServer}/users`;
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }

  loginUnique(login: string) {
    return this.http
      .get<User[]>(this.apiUrl)
      .pipe(map((users) => users.find((u) => u.login === login) === undefined));
  }

  createUser(user: User) {
    return this.http.post<User>(this.apiUrl, user, this.options);
  }
}
