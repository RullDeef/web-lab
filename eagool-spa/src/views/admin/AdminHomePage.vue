<script setup lang="ts">
import AdminNavbar from '@/components/admin/AdminNavbar.vue';
</script>

<script lang="ts">
import injector from 'vue-inject';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

export default {
  computed: {
    user(): User {
      const authService = injector.get('authService') as AuthService;
      return authService.getUser();
    },
  },
};
</script>

<template>
  <AdminNavbar />

  <b-container class="mt-3">
    <h3>Панель администратора</h3>
    <p>Здравствуйте, {{ user.first_name }}!</p>
  </b-container>
</template>
