<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { UserRole } from '../models/user';
import AuthGuard from '../guards/auth.guard';
import AdminNavbar from './admin/AdminNavbar.vue';

const userFirstName = ref('');

onMounted(async () => {
  userFirstName.value = (await AuthGuard(UserRole.admin)).first_name;
});
</script>

<template>
  <AdminNavbar />

  <b-container class="mt-3">
    <h3>Панель администратора</h3>
    <p>Здравствуйте, {{ userFirstName }}!</p>
  </b-container>
</template>
