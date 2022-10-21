<script setup lang="ts">
import Navbar from '../utils/Navbar.vue';
</script>

<template>
  <Navbar :routes="[{name: 'Пользователи', path: '/admin-panel/users'}]" :auth="{name: 'Выйти', path: '/logout'}" />
</template>
