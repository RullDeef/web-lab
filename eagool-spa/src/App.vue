<script setup lang="ts">
import axios from 'axios';
import { provide } from 'vue';
import { AuthService } from './services/auth.service';
import { StudyGroupsService } from './services/study-groups.service';
import { UsersService } from './services/users.service';

const axiosInstance = axios.create({
  baseURL: 'http://localhost/api/v1/',
});

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

provide('axios', axiosInstance);
provide('auth-service', new AuthService(axiosInstance));
provide('users-service', new UsersService(axiosInstance));
provide('study-groups-service', new StudyGroupsService(axiosInstance));
</script>

<template>
  <router-view></router-view>
</template>
