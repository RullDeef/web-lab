import { AuthService } from 'src/app/services/auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn()) {
      const authToken = this.authService.getAuthorizationToken();

      const authRequest = req.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` },
      });

      return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }
}
