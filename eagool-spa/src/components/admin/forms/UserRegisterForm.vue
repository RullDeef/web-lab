<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
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

const modal = ref<Modal>({} as Modal);
const modalShown = ref<boolean>(false);
const userData = ref<UserFormData>(emptyUserData());

const usersService = inject('users-service') as UsersService;

async function registerUser() {
  console.log('registering new user...');

  const { passwordConfirm, ...dto } = userData.value;

  if (passwordConfirm !== dto.password) {
    alert('Пароли не совпадают!');
  } else {
    await usersService.registerUser(dto);
    modal.value.hide();
  }
}

onMounted(() => {
  const modalRoot = document.querySelector('#modal-content')?.parentElement;
  if (modalRoot === undefined || modalRoot === null) {
    console.error('modal root is not defined');
    return;
  }

  modal.value = new Modal(modalRoot as HTMLElement);

  modalRoot.addEventListener('show.bs.modal', () => {
    modalShown.value = true;
  });

  modalRoot.addEventListener('hide.bs.modal', () => {
    modalShown.value = false;
  });
});

onBeforeRouteLeave((to, from, next) => {
  if (modalShown.value) {
    next(false);
    modal.value.hide();
  } else {
    next();
  }
});
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
              v-model="userData.first_name"
            />
          </div>
          <div class="form-group mb-3">
            <label for="first-name">Имя</label>
            <input
              id="first-name"
              class="form-control"
              type="text"
              name="first_name"
              v-model="userData.last_name"
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
