<script setup lang="ts">
import axios from 'axios';
import { provide } from 'vue';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

const axios_instance = axios.create({
  baseURL: 'http://localhost/api/v1/',
});

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

provide('axios', axios_instance);
provide('auth-service', new AuthService(axios_instance));
provide('users-service', new UsersService(axios_instance));

</script>

<template>
  <router-view></router-view>
</template>

<style scoped>

</style>
