<template>
  <!-- Header -->
  <AppHeader />

  <!-- This will replaced with the correct component associated with the path -->
  <!-- The reason we are grabbing the slot property is cus  we need access to the components that are being swapped-->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

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

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
