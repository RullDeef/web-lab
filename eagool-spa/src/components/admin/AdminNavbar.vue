<script setup lang="ts">
import NavBar from '../utils/NavBar.vue';
</script>

<template>
  <NavBar
    :routes="[
      { name: 'Пользователи', path: '/admin-panel/users' },
      { name: 'Учебные группы', path: '/admin-panel/study-groups' },
    ]"
    :auth="{ name: 'Выйти', path: '/logout' }"
  />
</template>
