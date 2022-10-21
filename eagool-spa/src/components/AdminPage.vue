<script setup lang="ts">
import { UserRole } from '../models/user';
import Navbar from './utils/Navbar.vue';

import AuthGuard from '../guards/auth.guard';

const user = AuthGuard.apply(UserRole.admin);

</script>

<template>
  <Navbar :routes="[{name: 'Пользователи', path: '/admin-panel/users'}]" :auth="{name: 'Выйти', path: '/logout'}" />

</template>
