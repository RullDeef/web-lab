<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { User, UserRole } from '../../models/user';
import { UsersService } from '../../services/users.service';
import AdminNavbar from './AdminNavbar.vue';
import UsersTable from './UsersTable.vue';
import UserRegisterForm from '../forms/UserRegisterForm.vue';
import AuthGuard from '../../guards/auth.guard';

const currentPage = ref(0);
const users = ref<User[]>([]);

const usersService = inject('users-service') as UsersService;

async function deleteUser(id: number) {
  console.log(`deleting user with id=${id}`);
  await usersService.deleteUser(id);
  users.value = await usersService.getAllPaged(currentPage.value);
}

async function toPrevPage() {
  if (currentPage.value > 0) {
    currentPage.value--;
    users.value = await usersService.getAllPaged(currentPage.value);
  }
}

async function toNextPage() {
  const newUsers = await usersService.getAllPaged(currentPage.value + 1);
  if (newUsers.length > 0) {
    currentPage.value++;
    users.value = newUsers;
  }
}

onMounted(async () => {
  await AuthGuard(UserRole.admin);
  users.value = await usersService.getAllPaged(currentPage.value);
});
</script>

<template>
  <AdminNavbar />

  <div class="container mt-3">
    <UsersTable :users="users" :on-delete="deleteUser" />

    <div class="d-flex flex-row align-items-baseline">
      <button
        class="btn btn-primary"
        data-bs-target="#register-user"
        data-bs-toggle="modal"
      >
        Добавить пользователя
      </button>

      <a class="mx-4" @click="toPrevPage" href="#"><b-icon-arrow-left /></a>
      <span>страница: {{ currentPage + 1 }}</span>
      <a class="mx-4" @click="toNextPage" href="#"><b-icon-arrow-right /></a>
    </div>

    <div class="modal" id="register-user">
      <UserRegisterForm />
    </div>
  </div>
</template>
