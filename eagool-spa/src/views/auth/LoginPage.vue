<script setup lang="ts">
import NavBar from '../../components/utils/NavBar.vue';
</script>

<script lang="ts">
import { ref } from 'vue';
import injector from 'vue-inject';
import router from '../../router';
import { AuthService } from '../../services/auth.service';

export default {
  data() {
    return {
      login: ref(''),
      password: ref(''),
      authError: ref(false),
    };
  },

  methods: {
    async doAuth() {
      try {
        console.log('trying to login...');
        const authService = injector.get('authService') as AuthService;
        await authService.auth(this.login, this.password);
        this.login = '';
        this.password = '';
        router.back();
      } catch (e) {
        console.log(`caught exception: ${JSON.stringify(e)}`);
        this.authError = true;
      }
    },
  },
};
</script>

<template>
  <NavBar :routes="[]" />
  <div id="page-container" class="d-flex">
    <div class="container col-3 my-auto">
      <h4>Авторизуйтесь, чтобы продолжить</h4>
      <div class="form-group mb-3">
        <label for="login-input">Логин</label>
        <input
          id="login-input"
          class="form-control"
          v-model="login"
          type="text"
        />
      </div>
      <div class="form-group mb-3">
        <label for="password-input">Пароль</label>
        <input
          id="password-input"
          class="form-control"
          v-model="password"
          type="password"
        />
      </div>
      <div class="error text-danger" :class="{ invisible: !authError }">
        Неверный логин или пароль
      </div>
      <input
        type="submit"
        class="btn btn-primary"
        value="Войти"
        @click="doAuth"
      />
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
