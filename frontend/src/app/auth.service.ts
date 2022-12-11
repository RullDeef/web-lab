import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public isLogged(): boolean {
    return localStorage.getItem('jwt') !== null;
  }

  public login(login: string, password: string): Observable<AuthResult> {
    return this.http.post<AuthResult>(
      'http://localhost/api/v1/auth/login', { login, password }, this.httpOptions
    ).pipe(
      tap((res: AuthResult) => this.setSession(res)),
      catchError(this.handleError<AuthResult>('login'))
    )
  }

  public logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('activeUser');
  }

  public getRole(): string {
    return localStorage.getItem('activeUser') || '';
  }

  private setSession(authResult: AuthResult): void {
    localStorage.setItem('jwt', authResult.access_token);
    localStorage.setItem('activeUser', authResult.user.role);
  }

  private log(message: string) {
    console.log(`AuthService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

interface AuthResult {
  access_token: string;
  user: User;
}