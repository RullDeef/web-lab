import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = '';

  constructor() { }

  public isLogged(): boolean {
    return this.token !== '';
  }

  public login(username: string, password: string): Observable<boolean> {
    this.token = 'token';
    return of(true);
  }

  public logout(): void {
    // TODO: Implement logout
    this.token = '';
  }
}
