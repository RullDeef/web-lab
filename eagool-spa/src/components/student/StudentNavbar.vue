<script setup lang="ts">
import NavBar from '../utils/NavBar.vue';

export interface StudentNavBarProps {
  groupName: string;
}

defineProps<StudentNavBarProps>();
</script>

<template>
  <NavBar
    :routes="[{ name: groupName, path: '/student' }]"
    :auth="{ name: 'Выйти', path: '/logout' }"
  />
</template>
