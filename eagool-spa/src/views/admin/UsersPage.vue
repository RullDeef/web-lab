<script setup lang="ts">
import AdminNavbar from '@/components/admin/AdminNavbar.vue';
import UsersTable from '@/components/admin/UsersTable.vue';
import UserEditForm from '@/components/admin/forms/UserEditForm.vue';
import Pager from '@/components/utils/Pager.vue';
</script>

<script lang="ts">
import { createVNode } from 'vue';
import injector from 'vue-inject';
import { useModal } from 'vue-modal-provider';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import UserRegisterForm from '@/components/admin/forms/UserRegisterForm.vue';

export default {
  data() {
    return {
      currentPage: 0,
      users: [] as User[],
      selectedUser: null as User | null,

      registerUserModal: useModal(UserRegisterForm),
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
    async registerUser() {
      await this.registerUserModal.show({
        header: 'hewwo',
      });
    },

    async editUser(user: User) {
      this.selectedUser = user;

      // const modalRoot = document.querySelector('#edit-user')?.parentElement;
      // if (modalRoot !== undefined && modalRoot !== null) {
      //   const modal = new Modal(modalRoot);
      //   modal.show();
      // }
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
      <b-button variant="primary" @click="registerUser">
        Добавить пользователя
      </b-button>

      <Pager
        :curr-page="currentPage"
        @prev-page="toPrevPage"
        @next-page="toNextPage"
      />
    </div>

    <div class="modal" id="edit-user">
      <UserEditForm :user="selectedUser" />
    </div>
  </b-container>
</template>
