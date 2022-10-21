<script setup lang="ts">
import { User } from '../../models/user';

export interface UsersTableProps {
  users: User[];
}

defineProps<UsersTableProps>();

</script>

<template>
  <h3>Список всех пользователей</h3>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Фамилия</th>
        <th scope="col">Имя</th>
        <th scope="col">Логин</th>
        <th scope="col">Роль</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.last_name }}</td>
        <td>{{ user.first_name }}</td>
        <td>&lt;login&gt;</td>
        <td>{{ user.role }}</td>
      </tr>
    </tbody>
  </table>
</template>
