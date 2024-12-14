<template>
  <div :class="[store.hiddenClass, 'fixed inset-0 z-10 overflow-y-auto']" id="modal" style="z-index: 100;">
    <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div @click="store.isOpen = !store.isOpen" class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="px-6 py-4 text-left">
          <!--Title-->
          <div class="flex items-center justify-between pb-4">
            <p class="text-2xl font-bold">{{ $t('auth.title') }}</p>
            <!-- Modal Close Button -->
            <div @click="store.isOpen = !store.isOpen" class="z-50 cursor-pointer modal-close">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a :class="{ 'hover:text-white text-white rounded bg-blue-600': tab === 'login', 'hover:text-blue-600': tab === 'register' }"
                @click.prevent="tab = 'login'" class="block px-4 py-3 transition" href="#">{{ $t('auth.form.login') }}</a>
            </li>
            <li class="flex-auto text-center">
              <a :class="{ 'hover:text-white text-white bg-blue-600': tab === 'register', 'hover:text-blue-600': tab === 'login' }"
                @click.prevent="tab = 'register'" class="block px-4 py-3 transition rounded" href="#">{{ $t('auth.form.register') }}</a>
            </li>
          </ul>
          <!-- Login Form -->
          <div v-if="tab === 'login'">
            <LoginForm />
          </div>
          <!-- Registration Form -->
          <div v-else>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modal';
import { ref } from 'vue'
import RegisterForm from '../forms/RegisterForm.vue';
import LoginForm from '../forms/LoginForm.vue';

const store = useModalStore()

const tab = ref('login')

</script>

<style></style>
