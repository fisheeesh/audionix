<template>
  <li class="flex justify-between p-6 border border-gray-200 bg-gray-50">
    <!-- Comment Author, Timestamp, and Content (Left Aligned) -->
    <div class="flex-1">
      <div class="font-bold">{{ props.comment.name }}</div>
      <time class="text-sm text-gray-400">{{ formattedComment }}</time>
      <p class="mt-2">
        {{ props.comment.content }}
      </p>
    </div>

    <!-- Delete Button (Right Aligned) -->
    <button v-if="auth.currentUser.uid === props.comment.uid" class="text-red-500 hover:text-red-700 focus:outline-none"
      @click.prevent="deleteComment">
      <i class="fas fa-trash-alt"></i> <!-- Trash icon -->
    </button>
  </li>
</template>

<script setup>
import { auth, cmtCollection } from '@/includes/firebase';
import { formatDistanceToNow } from 'date-fns';
import { computed, onMounted } from 'vue';

const props = defineProps({
  comment: {
    type: Object,
    required: true
  },
  song: {
    type: Object,
    required: true
  }
})


const formattedComment = computed(() => {
  const formattedTime = formatDistanceToNow(new Date(props.comment.datePosted))

  return `${formattedTime} ago`
})

onMounted(() => {
  console.log(props.comment)
  console.log(formattedComment.value)
})

const deleteComment = async () => {
  // eslint-disable-next-line vue/no-mutating-props
  props.song.comment_count -= 1
  await cmtCollection.doc(props.comment.docID).delete()
}

</script>

<style></style>
