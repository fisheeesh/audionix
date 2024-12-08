<template>
  <header id="header" class="bg-gray-700">
    <nav class="container flex items-center justify-start px-4 py-5 mx-auto">
      <!-- App Name -->
      <router-link exact-active-class="no-active" :to="{ name: 'home' }"
        class="mr-4 text-2xl font-bold text-white uppercase">Music</router-link>

      <div class="flex items-center flex-grow">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'about' }">About</router-link>
          </li>
          <!-- Navigation Links -->
          <li v-if="!userStore.userLoggedIn">
            <button class="px-2 text-white focus:outline-none form-option" @click.prevent="toggleAuthModal">
              Login / Register
            </button>
          </li>
          <!-- By wrapping it with the template tags, we'll be able ot render multiple list items -->
          <template v-else>
            <li>
              <router-link :to="{ name: 'manage' }"
                class="px-2 text-white hover:text-gray-300 focus:outline-none form-option">
                Manage
              </router-link>
            </li>
            <li>
              <button @click="signOut" type="button"
                class="px-2 text-white hover:text-gray-300 focus:outline-none form-option">
                LogOut
              </button>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
// import getUser from "@/composables/getUser";
import { useModalStore } from "@/stores/modal"
import { useUserStore } from "@/stores/user";
// import { watch } from "vue";
import { useRoute, useRouter } from "vue-router"

const route = useRoute()

// const { user } = getUser()

const router = useRouter()
const store = useModalStore()
const userStore = useUserStore()

const toggleAuthModal = () => {
  store.isOpen = !store.isOpen
  console.log(store.isOpen)
}

const signOut = () => {
  userStore.signOut()
  console.log(router)
  console.log(route)
  if (route.meta.requiresAuth) router.push({ name: 'home' })
}

// watch(user, () => {
//   if (!user.value) router.push({ name: 'home' })
// })
</script>

<style></style>
