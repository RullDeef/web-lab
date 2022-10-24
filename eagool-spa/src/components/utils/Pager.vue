<script setup lang="ts">
defineProps<{ currPage: number }>();
</script>

<template>
  <div class="d-flex flex-row align-items-baseline">
    <b-button variant="outline-info" @click="$emit('prev-page')" href="#">
      <b-icon-arrow-left />
    </b-button>
    <span class="mx-3">страница: {{ currPage + 1 }}</span>
    <b-button variant="outline-info" @click="$emit('next-page')" href="#">
      <b-icon-arrow-right />
    </b-button>
  </div>
</template>
