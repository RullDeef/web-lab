<script setup lang="ts">
import { inject } from 'vue';
import router from '../router';
import { AuthService } from '../services/auth.service';
import Navbar from './utils/Navbar.vue';

const authService = inject('auth-service') as AuthService;

if (authService.isAuthorized()) {
  console.log('redirecting to admin panel!');
  router.replace({ name: 'admin-panel' });
}

</script>

<template>
  <navbar :routes="[]" :auth="{ name: 'Войти', path: '/auth' }" />

  <div class="container mt-3">
    <h1>EAGOOL</h1>
    <h3>Приложение для контроля выполнения домашних заданий по английскому языку</h3>
  </div>
</template>
