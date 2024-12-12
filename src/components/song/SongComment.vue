<template>
  <li class="p-6 border border-gray-200 bg-gray-50">
    <!-- Comment Author -->
    <div class="mb-5">
      <div class="font-bold">{{ props.comment.name }}</div>
      <time class="text-sm text-gray-400">{{ formattedComment }}</time>
    </div>
    <p>
      {{ props.comment.content }}
    </p>
  </li>
</template>

<script setup>
import { formatDistanceToNow } from 'date-fns';
import { computed, onMounted } from 'vue';

const props = defineProps({
  comment: {
    type: Object,
    required: true
  }
})

const formattedComment = computed(() => {
  const formattedTime = formatDistanceToNow(new Date(props.comment.datePosted))

  return `${formattedTime} ago`
})

onMounted(() => {
  console.log(formatDistanceToNow(new Date(props.comment.datePosted)))
  console.log(formattedComment.value)
})

</script>

<style></style>
