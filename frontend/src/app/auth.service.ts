import jwtDecode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static SERVER_BASE_URL = 'http://localhost/api/v1';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private logger: NGXLogger,
    private http: HttpClient,
  ) { }

  public isLogged(): boolean {
    this.logger.trace("isLogged");

    return localStorage.getItem('jwt') !== null;
  }

  public login(login: string, password: string): Observable<AuthResult> {
    this.logger.trace(`login login=${login} password=***`);

    return this.http.post<AuthResult>(
      `${AuthService.SERVER_BASE_URL}/auth/login`, { login, password }, this.httpOptions
    ).pipe(
      tap((res: AuthResult) => this.setSession(res)),
      catchError(this.handleError<AuthResult>('login'))
    )
  }

  public logout(): void {
    this.logger.trace("logout");

    localStorage.removeItem('jwt');
  }

  public getRole(): string {
    this.logger.trace("getRole");

    const jwtObject = this.getJwtObject();
    return jwtObject === null ? '' : jwtObject.role;
  }

  private getJwtObject(): JwtObject | null {
    this.logger.trace("getJwtObject");

    const jwt = localStorage.getItem('jwt');

    if (jwt === null) {
      this.logger.warn("failed to get saved jwt token from local storage");
      return null;
    }

    try {
      return jwtDecode<JwtObject>(jwt);
    }
    catch (e) {
      this.logger.error(`failed to decode jwt token "${jwt}"`);
      return null;
    }
  }

  private setSession(authResult: AuthResult): void {
    this.logger.trace(`setSession authResult=${JSON.stringify(authResult)}`);

    localStorage.setItem('jwt', authResult.access_token);
  }

  private handleError<T>(_: string, result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(error);
      return of(result as T);
    };
  }
}

interface AuthResult {
  access_token: string;
}

interface JwtObject {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  iat: number;
  exp: number;
}
