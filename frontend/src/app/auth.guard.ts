import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserLogin(next, state.url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any) : boolean {
    if (this.auth.isLogged()) {
      const userRole = this.auth.getRole();
      if (route.data['role'] && route.data['role'] === userRole) {
        return true;
      }

      if (!route.data['role']) {
        return true;
      }

      if (userRole === 'admin') {
        this.router.navigate(['/admin']);
        return false;
      }

      if (userRole === 'user') {
        this.router.navigate(['/user']);
        return false;
      }

      if (userRole === 'teacher') {
        this.router.navigate(['/teacher']);
        return false;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
