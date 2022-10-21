import { User } from './../models/user';
import { AuthService } from './../services/auth.service';
import { inject } from 'vue';
import { UserRole } from '../models/user';
import router from '../router';

export default class AuthGuard {
  static apply(role: UserRole): User {
    const authService = inject('auth-service') as AuthService;

    if (!authService.isAuthorized()) {
      router.push({ name: 'auth' });
    }

    const user = authService.getUser();
    if (user.role != role) {
      router.push({ name: 'forbidden' });
    }

    return user;
  }
}
