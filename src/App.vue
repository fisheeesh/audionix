<template>
  <!-- Header -->
  <AppHeader />

  <!-- This will replaced with the correct component associated with the path -->
  <router-view />

  <!-- Player -->
  <AppPlayer />

  <!-- Auth Modal -->
  <AppAuth />
</template>

<script setup>
import { onMounted } from 'vue';
import AppAuth from './components/app/AppAuth.vue';
import AppHeader from './components/app/AppHeader.vue';
import { useUserStore } from './stores/user';
import { auth } from './includes/firebase';
import AppPlayer from './components/app/AppPlayer.vue';

const userStore = useUserStore();

onMounted(() => {
  if (auth.currentUser) {
    userStore.userLoggedIn = true
  }
})
</script>

<style></style>
