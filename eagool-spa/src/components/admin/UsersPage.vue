<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { User, UserRole } from '../../models/user';
import { UsersService } from '../../services/users.service';
import AdminNavbar from './AdminNavbar.vue';
import UsersTable from './views/UsersTable.vue';
import UserRegisterForm from './forms/UserRegisterForm.vue';
import UserEditForm from './forms/UserEditForm.vue';
import AuthGuard from '../../guards/auth.guard';
import Pager from '../utils/Pager.vue';
import { Modal } from 'bootstrap';

const currentPage = ref(0);
const users = ref<User[]>([]);

const selectedUser = ref<User>({} as User);

const usersService = inject('users-service') as UsersService;

async function editUser(user: User) {
  selectedUser.value = user;

  const modalRoot = document.querySelector('#edit-user')?.parentElement;
  if (modalRoot !== undefined && modalRoot !== null) {
    const modal = new Modal(modalRoot);
    modal.show();
  }
}

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

  <b-container class="mt-3">
    <h3>Список пользователей</h3>
    <UsersTable :users="users" :on-edit="editUser" :on-delete="deleteUser" />

    <div class="d-flex flex-row justify-content-between align-items-baseline">
      <b-button
        variant="primary"
        data-bs-target="#register-user"
        data-bs-toggle="modal"
      >
        Добавить пользователя
      </b-button>

      <Pager
        :curr-page="currentPage"
        @prev-page="toPrevPage"
        @next-page="toNextPage"
      />
    </div>

    <div class="modal" id="register-user">
      <UserRegisterForm />
    </div>

    <div class="modal" id="edit-user">
      <UserEditForm :user="selectedUser" />
    </div>
  </b-container>
</template>
