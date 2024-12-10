<template>
  <li class="p-6 border border-gray-200 bg-gray-50">
    <!-- Comment Author -->
    <div class="mb-5">
      <div class="font-bold">{{ props.comment.name }}</div>
      <time>{{ props.comment.datePosted }}</time>
    </div>
    <p>
      {{ props.comment.content }}
    </p>
  </li>
</template>

<script setup>
const props = defineProps({
  comment: {
    type: Object,
    required: true
  }
})
</script>

<style></style>
