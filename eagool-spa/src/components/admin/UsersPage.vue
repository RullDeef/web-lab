<script setup lang="ts">
import { inject, ref } from 'vue';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import AdminNavbar from './AdminNavbar.vue';
import UsersTable from './UsersTable.vue';
import UserRegisterForm from '../forms/UserRegisterForm.vue';

const usersService = inject('users-service') as UsersService;

const users = ref<User[]>([]);

async function loadUsers() {
  users.value = await usersService.getAllPaged(0);
}

loadUsers();

</script>

<template>
  <AdminNavbar />

  <div class="container mt-3">
    <UsersTable :users="users"/>

    <button class="btn btn-primary" data-bs-target="#register-user" data-bs-toggle="modal">Добавить пользователя</button>

    <div class="modal" id="register-user">
      <UserRegisterForm />
    </div>
  </div>
</template>
