<template>
  <div class="p-3 mb-4 border border-gray-200 rounded">
    <div v-if="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ props.song.modified_name }}</h4>
      <button class="float-right px-2 py-1 ml-1 text-sm text-white bg-red-600 rounded">
        <i class="fa fa-times"></i>
      </button>
      <button @click.prevent="showForm = !showForm"
        class="float-right px-2 py-1 ml-1 text-sm text-white bg-blue-600 rounded">
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-if="showForm">
      <form>
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <input type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <input type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre" />
        </div>
        <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600">
          Submit
        </button>
        <button type="button" class="ms-3 py-1.5 px-3 rounded text-white bg-gray-600">
          Go Back
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  song: {
    type: Object,
    required: true
  }
})

const showForm = ref(false)
</script>

<style></style>
