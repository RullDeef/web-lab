import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserRole } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserLogin(next, state.url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.auth.isLogged()) {
      const userRole = this.auth.getRole();
      if (route.data['role'] && route.data['role'] === userRole) {
        return true;
      }

      if (!route.data['role']) {
        return true;
      }
      else if (userRole == UserRole.ADMIN) {
        this.router.navigate(['/admin']);
        return false;
      }
      else if (userRole == UserRole.STUDENT) {
        this.router.navigate(['/student']);
        return false;
      }
      else if (userRole === UserRole.TUTOR) {
        this.router.navigate(['/teacher']);
        return false;
      }
      else {
        throw Error(`invalid value for userRole: ${userRole}`);
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
