<script setup lang="ts">
import { inject } from 'vue';
import router from '../../router';
import { AuthService } from '../../services/auth.service';

const authService = inject('auth-service') as AuthService;
authService.logout();
router.replace({ name: 'home' });
</script>

<template>
</template>
