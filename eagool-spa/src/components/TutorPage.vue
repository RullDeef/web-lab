<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import AuthGuard from '../guards/auth.guard';
import { StudyGroup } from '../models/study-group';
import { UserRole } from '../models/user';
import { StudyGroupsService } from '../services/study-groups.service';
import TutorNavbar from './tutor/TutorNavbar.vue';
import StudyGroupTable from './tutor/views/StudyGroupTable.vue';

const group = ref<StudyGroup | null>(null);

onMounted(async () => {
  AuthGuard(UserRole.tutor);

  const service = inject('study-groups-service') as StudyGroupsService;
  group.value = (await service.getAll())[0];
});
</script>

<template>
  <TutorNavbar :current-group="group" />

  <b-container class="mt-3" v-if="group !== null">
    <h3>Успеваемость группы {{ group.title }}</h3>

    <StudyGroupTable :group="group" />
  </b-container>
</template>
