<script setup lang="ts">
import { inject } from 'vue';
import { AuthService } from '../services/auth.service';
import router from '../router';
import NavBar from './utils/NavBar.vue';
import { UserRole } from '../models/user';

const authService = inject('auth-service') as AuthService;

if (authService.isAuthorized()) {
  const role = authService.getUser().role;
  if (role === UserRole.admin) {
    console.log('redirecting to admin panel!');
    router.push({ name: 'admin-panel' });
  } else if (role === UserRole.tutor) {
    console.log('redirecting to tutor home page!');
    router.push({ name: 'tutor-panel' });
  } else {
    console.log('TODO: implement student pages');
  }
}
</script>

<template>
  <NavBar :routes="[]" :auth="{ name: 'Войти', path: '/auth' }" />

  <div class="container mt-3">
    <h1>EAGOOL</h1>
    <h3>
      Приложение для контроля выполнения домашних заданий по английскому языку
    </h3>
  </div>
</template>
