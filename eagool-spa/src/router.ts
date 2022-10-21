import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import AuthPage from './components/auth/AuthPage.vue';
import LogoutPage from './components/auth/LogoutPage.vue';
import ForbiddenPage from './components/auth/ForbiddenPage.vue';
import HomePage from './components/HomePage.vue';
import AdminPage from './components/AdminPage.vue';
import UsersPage from './components/admin/UsersPage.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthPage,
    },
    {
        path: '/logout',
        name: 'logout',
        component: LogoutPage,
    },
    {
        path: '/forbidden',
        name: 'forbidden',
        component: ForbiddenPage,
    },
    {
        path: '/admin-panel',
        name: 'admin-panel',
        component: AdminPage,
    },
    {
        path: '/admin-panel/users',
        name: 'admin-panel/users',
        component: UsersPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
