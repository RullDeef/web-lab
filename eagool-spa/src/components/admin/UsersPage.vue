<script setup lang="ts">
import { inject, ref } from 'vue';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import AdminNavbar from './AdminNavbar.vue';
import UsersTable from './UsersTable.vue';

const usersService = inject('users-service') as UsersService;

const users = ref<User[]>([]);

async function loadUsers() {
  users.value = await usersService.getAll();
}

loadUsers();

</script>

<template>
  <AdminNavbar />

  <div class="container">
    <UsersTable :users="users"/>
  </div>
</template>
