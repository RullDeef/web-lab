<script setup lang="ts">
import { ModalProvider } from 'vue-modal-provider';
</script>

<template>
  <modal-provider>
    <router-view :key="$route.fullPath" />
  </modal-provider>
</template>
