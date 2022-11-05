import injector from 'vue-inject';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { UserRole } from './models/user';
import { AuthService } from './services/auth.service';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    beforeEnter: (to, from, next) => {
      const authService = injector.get('authService') as AuthService;
      if (!authService.isAuthorized()) {
        console.log('not authorized!');
        next();
      } else {
        console.log('authorized!');
        switch (authService.getUser().role) {
          case UserRole.admin:
            next({ name: 'admin-home' });
            break;
          case UserRole.tutor:
            next({ name: 'tutor-home' });
            break;
          case UserRole.student:
            next({ name: 'student-home' });
            break;
        }
      }
    },
    component: async () => await import('@/views/HomePage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: async () => await import('@/views/auth/LoginPage.vue'),
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      const authService = injector.get('authService') as AuthService;
      authService.logout();
      next({ name: 'home' });
    },
    component: async () => null,
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: async () => await import('@/views/auth/ForbiddenPage.vue'),
  },
  {
    path: '/admin-home',
    name: 'admin-home',
    component: async () => await import('@/views/admin/AdminHomePage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin-home/users',
    name: 'admin-users',
    component: async () => await import('@/views/admin/UsersPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin-home/study-groups',
    name: 'admin-groups',
    component: async () => await import('@/views/admin/StudyGroupsPage.vue'),
    meta: { requiresAuth: true },
  },
  // {
  //   path: '/tutor',
  //   name: 'tutor-panel',
  //   component: async () => await import('./TutorPage.vue'),
  //   meta: { requiresAuth: true },
  // },
  {
    path: '/:pathMatch(.*)*',
    component: async () => await import('./views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if ('requiresAuth' in to.meta) {
    const authService = injector.get('authService') as AuthService;
    if (!authService.isAuthorized()) {
      console.log('required to login to continue');
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
