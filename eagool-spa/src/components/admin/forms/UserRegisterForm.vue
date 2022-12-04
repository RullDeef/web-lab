<script setup lang="ts">
import BaseModal from '@/components/utils/BaseModal.vue';
</script>

<script lang="ts">
import injector from 'vue-inject';
import { UserRole } from '../../../models/user';
import { UsersService } from '../../../services/users.service';

export interface UserFormData {
  first_name: string;
  last_name: string;
  role: UserRole;
  login: string;
  password: string;
  passwordConfirm: string;
}

function emptyUserData(): UserFormData {
  return {
    first_name: '',
    last_name: '',
    role: UserRole.admin,
    login: '',
    password: '',
    passwordConfirm: '',
  };
}

export default {
  extends: BaseModal,

  data() {
    return {
      userData: emptyUserData(),
    };
  },

  computed: {
    usersService(): UsersService {
      return injector.get('usersService');
    },
  },

  methods: {
    async confirm() {
      console.log('registering new user...');

      const { passwordConfirm, ...dto } = this.userData;

      if (passwordConfirm !== dto.password) {
        alert('Пароли не совпадают!');
      } else {
        await this.usersService.registerUser(dto);
        this.$emit('confirm');
      }
    },

    async cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<template>
  <BaseModal>
    <body>
      <div class="form">
        <div class="form-group mb-3">
          <label for="last-name">Фамилия</label>
          <input
            id="last-name"
            class="form-control"
            type="text"
            name="last_name"
            v-model="userData.last_name"
          />
        </div>
        <div class="form-group mb-3">
          <label for="first-name">Имя</label>
          <input
            id="first-name"
            class="form-control"
            type="text"
            name="first_name"
            v-model="userData.first_name"
          />
        </div>
        <div class="form-group mb-3">
          <label for="role">Роль</label>
          <select
            id="role"
            class="form-control"
            name="role"
            v-model="userData.role"
          >
            <option value="admin">Администратор</option>
            <option value="tutor">Преподаватель</option>
            <option value="student">Студент</option>
          </select>
        </div>
        <div class="form-group mb-3">
          <label for="login">Логин</label>
          <input
            id="login"
            class="form-control"
            type="text"
            name="login"
            v-model="userData.login"
          />
        </div>
        <div class="form-group mb-3">
          <label for="password">Пароль</label>
          <input
            id="password"
            class="form-control"
            type="password"
            name="password"
            v-model="userData.password"
          />
        </div>
        <div class="form-group mb-3">
          <label for="password-confirm">Подтверждение пароля</label>
          <input
            id="password-confirm"
            class="form-control"
            type="password"
            name="password-confirm"
            v-model="userData.passwordConfirm"
          />
        </div>
      </div>
    </body>
    <footer>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="cancel">
          Отменить
        </button>
        <button type="button" class="btn btn-primary" @click="confirm">
          Добавить
        </button>
      </div>
    </footer>
  </BaseModal>
</template>
