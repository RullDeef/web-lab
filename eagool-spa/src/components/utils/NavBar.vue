<script setup lang="ts">
export interface NavbarRoute {
  name: string;
  path: string;
}

export interface NavbarProps {
  routes: NavbarRoute[];
  auth?: NavbarRoute;
}

defineProps<NavbarProps>();
</script>

<template>
  <div class="border-bottom">
    <nav class="navbar navbar-expand container">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        Eagool
      </router-link>
      <div class="navbar-nav">
        <router-link
          class="nav-item nav-link d-inline"
          v-for="route in routes"
          :key="route.name"
          :to="route.path"
          >{{ route.name }}
        </router-link>
      </div>
      <div class="flex-grow-1"></div>
      <div class="form-inline nav-link" v-if="auth">
        <router-link :to="auth.path">{{ auth.name }}</router-link>
      </div>
    </nav>
  </div>
</template>
