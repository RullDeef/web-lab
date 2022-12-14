import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static SERVER_BASE_URL = 'http://localhost/api/v1';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}`})
  };

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${UserService.SERVER_BASE_URL}/users`, this.httpOptions);  
  }
}
