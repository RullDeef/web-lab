<script setup lang="ts">
import { StudyGroup } from '../../../models/study-group';
import { mixedName } from '../../../models/user';

export interface StudyGroupTableProps {
  group: StudyGroup;
}

defineProps<StudyGroupTableProps>();
</script>

<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col" style="width: 20%">Студент</th>
        <th scope="col" style="width: 80%">Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in group.students" :key="user.id">
        <td>{{ mixedName(user) }}</td>
        <td>
          <b-button class="mx-3" size="sm" variant="outline-danger">
            <b-icon-trash-fill />
          </b-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
