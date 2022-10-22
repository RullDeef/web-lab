<script setup lang="ts">
import { inject } from 'vue';
import { AuthService } from '../services/auth.service';
import router from '../router';
import NavBar from './utils/NavBar.vue';

const authService = inject('auth-service') as AuthService;

if (authService.isAuthorized()) {
  console.log('redirecting to admin panel!');
  router.push({ name: 'admin-panel' });
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
