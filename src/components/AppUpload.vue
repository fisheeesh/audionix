<template>
  <div class="relative flex flex-col bg-white border border-gray-200 rounded">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="float-right text-2xl text-green-400 fas fa-upload"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        class="w-full px-10 py-20 text-center text-gray-400 transition duration-500 border border-gray-400 border-dashed rounded cursor-pointer hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="upload">
        <h5>Drop your files here</h5>
      </div>
      <hr class="my-6 " />
      <!-- Progess Bars -->
      <div class="mb-4 ">
        <!-- File Name -->
        <div class="text-sm font-bold ">Just another song.mp3</div>
      <div class="flex h-4 overflow-hidden bg-gray-200 rounded ">
        <!-- Inner Progress Bar -->
        <div class="transition-all bg-blue-400 progress-bar" style="width: 75%"></div>
    </div>
  </div>
  <div class="mb-4">
    <div class="text-sm font-bold">Just another song.mp3</div>
    <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
      <div class="transition-all bg-blue-400 progress-bar" style="width: 35%"></div>
    </div>
  </div>
  <div class="mb-4">
    <div class="text-sm font-bold">Just another song.mp3</div>
    <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
      <div class="transition-all bg-blue-400 progress-bar" style="width: 55%"></div>
    </div>
  </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const is_dragover = ref(false)

const upload = () => {
  is_dragover.value = false
}

</script>

<style></style>
