<script setup lang="ts">
import NavBar from '../components/utils/NavBar.vue';
</script>

<template>
  <NavBar :routes="[]" :auth="{ name: 'Войти', path: '/login' }" />

  <div class="container mt-3">
    <h1>EAGOOL</h1>
    <h3>
      Приложение для контроля выполнения домашних заданий по английскому языку
    </h3>
  </div>
</template>
