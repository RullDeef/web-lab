<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AdminNavbar from '../../components/admin/AdminNavbar.vue';

const userFirstName = ref('');

onMounted(async () => {
  userFirstName.value = 'ADMIN'; // (await AuthGuard(UserRole.admin)).first_name;
});
</script>

<template>
  <AdminNavbar />

  <b-container class="mt-3">
    <h3>Панель администратора</h3>
    <p>Здравствуйте, {{ userFirstName }}!</p>
  </b-container>
</template>
