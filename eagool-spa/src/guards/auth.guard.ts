import { User } from './../models/user';
import { AuthService } from './../services/auth.service';
import { inject } from 'vue';
import { UserRole } from '../models/user';
import router from '../router';

export default async function AuthGuard(role: UserRole): Promise<User> {
  const authService = inject('auth-service') as AuthService;

  if (!authService.isAuthorized()) {
    await router.push({ name: 'auth' });
  }

  const user = authService.getUser();
  if (user.role !== role) {
    await router.push({ name: 'forbidden' });
  }

  return user;
}
