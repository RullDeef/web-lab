<script setup lang="ts">
import { StudyGroup } from '../../models/study-group';
import NavBar from '../../views/NavBar.vue';

export interface TutorNavBarProps {
  currentGroup: StudyGroup | null;
}

defineProps<TutorNavBarProps>();
</script>

<template>
  <NavBar
    :routes="[
      {
        name: currentGroup?.title ?? 'Группа',
        path: `/tutor/groups/${currentGroup?.id || 0}`,
      },
    ]"
    :auth="{ name: 'Выйти', path: '/logout' }"
  />
</template>
