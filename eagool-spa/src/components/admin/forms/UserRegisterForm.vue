<script lang="ts">
import injector from 'vue-inject';
import { Modal } from 'bootstrap';
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
  data() {
    return {
      modal: {} as Modal,
      modalShown: false,
      userData: emptyUserData(),
    };
  },

  computed: {
    usersService(): UsersService {
      return injector.get('usersService');
    },
  },

  mounted() {
    const modalRoot = document.querySelector('#modal-content')?.parentElement;
    if (modalRoot === undefined || modalRoot === null) {
      console.error('modal root is not defined');
      return;
    }

    this.modal = new Modal(modalRoot as HTMLElement);

    modalRoot.addEventListener('show.bs.modal', () => {
      this.modalShown = true;
    });

    modalRoot.addEventListener('hide.bs.modal', () => {
      this.modalShown = false;
    });
  },

  beforeRouteLeave(to, from, next) {
    if (this.modalShown) {
      next(false);
      this.modal.hide();
    } else {
      next();
    }
  },

  methods: {
    async registerUser() {
      console.log('registering new user...');

      const { passwordConfirm, ...dto } = this.userData;

      if (passwordConfirm !== dto.password) {
        alert('Пароли не совпадают!');
      } else {
        await this.usersService.registerUser(dto);
        this.modal.hide();
      }
    },
  },
};
</script>

<template>
  <div id="modal-content" class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Форма регистрации</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
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
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Отменить
        </button>
        <button type="button" class="btn btn-primary" @click="registerUser">
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>
