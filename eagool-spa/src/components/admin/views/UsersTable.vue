<script setup lang="ts">
import { User, translateUserRole } from '../../../models/user';

export interface UsersTableProps {
  users: User[];
  onDelete(id: number): void;
  onEdit(user: User): void;
}

defineProps<UsersTableProps>();
</script>

<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col" style="width: 6.1%">ID</th>
        <th scope="col" style="width: 22.7%">Фамилия</th>
        <th scope="col" style="width: 18.2%">Имя</th>
        <th scope="col" style="width: 18.2%">Логин</th>
        <th scope="col" style="width: 14.1%">Роль</th>
        <th scope="col" style="width: 20.7%">Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.last_name }}</td>
        <td>{{ user.first_name }}</td>
        <td>&lt;login&gt;</td>
        <td>{{ translateUserRole(user.role) }}</td>
        <td>
          <b-button size="sm" variant="outline-info" @click="onEdit(user)">
            <b-icon-gear />
          </b-button>
          <b-button
            class="mx-3"
            size="sm"
            variant="outline-danger"
            @click="onDelete(user.id)"
          >
            <b-icon-trash-fill />
          </b-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
