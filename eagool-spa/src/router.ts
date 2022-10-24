import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: async () => await import('./components/HomePage.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: async () => await import('./components/auth/AuthPage.vue'),
  },
  {
    path: '/logout',
    name: 'logout',
    component: async () => await import('./components/auth/LogoutPage.vue'),
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: async () => await import('./components/auth/ForbiddenPage.vue'),
  },
  {
    path: '/admin-panel',
    name: 'admin-panel',
    component: async () => await import('./components/AdminPage.vue'),
  },
  {
    path: '/admin-panel/users',
    name: 'admin-panel/users',
    component: async () => await import('./components/admin/UsersPage.vue'),
  },
  {
    path: '/admin-panel/study-groups',
    name: 'admin-panel/study-groups',
    component: async () =>
      await import('./components/admin/StudyGroupsPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
