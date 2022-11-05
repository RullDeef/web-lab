<script setup lang="ts">
import AdminNavbar from '@/components/admin/AdminNavbar.vue';
import UsersTable from '@/components/admin/UsersTable.vue';
import UserRegisterForm from '@/components/admin/forms/UserRegisterForm.vue';
import UserEditForm from '@/components/admin/forms/UserEditForm.vue';
import Pager from '@/components/utils/Pager.vue';
</script>

<script lang="ts">
import injector from 'vue-inject';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      currentPage: 0,
      users: [] as User[],
      selectedUser: null as User | null,
    };
  },

  computed: {
    usersService(): UsersService {
      return injector.get('usersService');
    },
  },

  async mounted() {
    this.users = await this.usersService.getAllPaged(this.currentPage);
  },

  methods: {
    async editUser(user: User) {
      this.selectedUser = user;

      const modalRoot = document.querySelector('#edit-user')?.parentElement;
      if (modalRoot !== undefined && modalRoot !== null) {
        const modal = new Modal(modalRoot);
        modal.show();
      }
    },

    async deleteUser(id: number) {
      await this.usersService.deleteUser(id);
      this.users = await this.usersService.getAllPaged(this.currentPage);
    },

    async toPrevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.users = await this.usersService.getAllPaged(this.currentPage);
      }
    },

    async toNextPage() {
      const newUsers = await this.usersService.getAllPaged(
        this.currentPage + 1,
      );
      if (newUsers.length > 0) {
        this.currentPage++;
        this.users = newUsers;
      }
    },
  },
};
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

    <!-- <div class="modal" id="register-user">
      <UserRegisterForm />
    </div> -->

    <div class="modal" id="edit-user">
      <UserEditForm :user="selectedUser" />
    </div>
  </b-container>
</template>
