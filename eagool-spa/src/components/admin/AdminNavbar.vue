<script setup lang="ts">
import NavBar from '../utils/NavBar.vue';
</script>

<template>
  <NavBar
    :routes="[
      { name: 'Пользователи', path: '/admin-home/users' },
      { name: 'Учебные группы', path: '/admin-home/study-groups' },
    ]"
    :auth="{ name: 'Выйти', path: '/logout' }"
  />
</template>
