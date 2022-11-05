<script setup lang="ts">
import { StudyGroup } from '../../models/study-group';

export interface StudyGroupsTableProps {
  groups: StudyGroup[];
  onDelete(id: number): void;
  onEditTutor(group: StudyGroup): void;
  onEditStudents(group: StudyGroup): void;
}

defineProps<StudyGroupsTableProps>();
</script>

<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Название</th>
        <th scope="col">Преподаватель</th>
        <th scope="col">Кол-во студентов</th>
        <th scope="col">Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="group in groups" :key="group.id">
        <td>{{ group.id }}</td>
        <td>{{ group.title }}</td>
        <td v-if="group.tutor !== null">
          {{ group.tutor.last_name }} {{ group.tutor.first_name[0] }}.
        </td>
        <td v-else class="text-danger">Не назначен</td>
        <td>{{ group.students.length }}</td>
        <td>
          <b-button
            class="mx-3"
            size="sm"
            variant="outline-info"
            @click="onEditTutor(group)"
          >
            <b-icon-pencil-fill /> преподаватель
          </b-button>
          <b-button
            class="mx-3"
            size="sm"
            variant="outline-warning"
            @click="onEditStudents(group)"
          >
            <b-icon-card-list /> студенты
          </b-button>
          <b-button
            class="mx-3"
            size="sm"
            variant="outline-danger"
            @click="onDelete(group.id)"
          >
            <b-icon-trash-fill />
          </b-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
