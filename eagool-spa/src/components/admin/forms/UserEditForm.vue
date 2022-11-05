<script setup lang="ts">
import { Modal } from 'bootstrap';
import { inject, onMounted, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { User } from '../../../models/user';
import { EditUserDto } from '../../../dto/edit.user.dto';
import { UsersService } from '../../../services/users.service';

export interface UserEditFormData {
  user: User;
}

const props = defineProps<UserEditFormData>();

const modal = ref<Modal>({} as Modal);
const modalShown = ref<boolean>(false);
const userData = ref<EditUserDto>({
  ...props.user,
  password: '',
} as EditUserDto);
const passwordConfirm = ref<string>('');

const userService = inject('users-service') as UsersService;

async function confirmEdit() {
  console.log('sending new user data...');

  await userService.editUser(props.user.id, userData.value);
  modal.value.hide();
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
        <h5 class="modal-title">Форма редактирования пользователя</h5>
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
            <label for="password">Установить новый пароль</label>
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
              v-model="passwordConfirm"
            />
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Отменить
        </button>
        <button type="button" class="btn btn-primary" @click="confirmEdit">
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>
