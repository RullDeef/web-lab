<script setup lang="ts">
import { inject, ref } from 'vue';
import router from '../../router';
import { AuthService } from '../../services/auth.service';
import Navbar from '../utils/Navbar.vue';

const authService = inject('auth-service') as AuthService;

const login = ref('');
const password = ref('');

async function doAuth() {
  try {
    await authService.auth(login.value, password.value);
    login.value = '';
    password.value = '';
    router.back();
  } catch (e) {
    console.log(`catched exception: ${JSON.stringify(e)}`);
  }
}

</script>

<template>
  <Navbar :routes="[]" />
  <div id="page-container" class="d-flex">
  <div class="container col-3 my-auto">
    <h4>Авторизуйтесь, чтобы продолжить</h4>
    <div class="form-group mb-3">
      <label for="login-input">Логин</label>
      <input id="login-input" class="form-control" v-model="login" type="text" placeholder="login" required />
    </div>
    <div class="form-group mb-3">
      <label for="password-input">Пароль</label>
      <input id="password-input" class="form-control" v-model="password" type="password" placeholder="password" required />
    </div>
    <input type="submit" class="btn btn-primary" value="Войти" @click="doAuth" />
  </div>
  </div>
</template>

<style scoped>
#page-container {
  position: fixed;
  height: 100vh;
  width: 100vw;
}
</style>
