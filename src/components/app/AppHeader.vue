<template>
  <header id="header" class="bg-gray-700">
    <nav class="container flex items-center justify-start px-4 py-5 mx-auto">
      <!-- App Name -->
      <router-link exact-active-class="no-active" :to="{ name: 'home' }"
        class="mr-4 text-2xl font-bold text-white uppercase">Music</router-link>

      <div class="flex items-center w-full">
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
        <!-- Second UL aligned to the right -->
        <ul class="ml-auto">
          <li>
            <a href="#" class="px-2 text-white" @click.prevent="changeLocale">
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
// import getUser from "@/composables/getUser";
import { useModalStore } from "@/stores/modal"
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
// import { watch } from "vue";
import { useRoute, useRouter } from "vue-router"

const { locale } = useI18n()
const route = useRoute()

// const { user } = getUser()

const router = useRouter()
const store = useModalStore()
const userStore = useUserStore()

const currentLocale = computed(() => {
  return locale.value === "my" ? "မြန်မာ" : "English"
})

const toggleAuthModal = () => {
  store.isOpen = !store.isOpen
  console.log(store.isOpen)
}

/**
 * ? We programmed the app to redirect the user if they attempt to visit a restricted page while not logged in
 */
const signOut = () => {
  userStore.signOut()
  // console.log(router)
  // console.log(route)

  /**
   * ? We check what the current route is before redirecting them
   * ? This solution works if we're working on a small sized app, but it doesn't scale for large apps
   * ! If we have a large number of restricted routes (user must be authenticated), we will have to update condi with || each route (Not a good deal)
   */
  // if(router.name === 'manage') router.push({ name: 'home' })

  /**
   * ? We can improve upon this by using root meta fields.
   * ? meta fields are customs values which can assign to route -> string, boolean, obj, number, etc/
   * ? By giving route meta fields, we can check for the meta field rather than the name
   */
  if (route.meta.requiresAuth) router.push({ name: 'home' })
}

// watch(user, () => {
//   if (!user.value) router.push({ name: 'home' })
// })

const changeLocale = () => {
  locale.value = locale.value === 'my' ? 'en' : 'my'
}
</script>

<style></style>
