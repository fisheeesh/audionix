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
    <button v-if="userAuthorized" class="text-red-500 hover:text-red-700 focus:outline-none"
      @click.prevent="deleteComment">
      <i class="fas fa-trash-alt"></i> <!-- Trash icon -->
    </button>
  </li>
</template>

<script setup>
import { auth, cmtCollection, songsCollection } from '@/includes/firebase';
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
  },
  id: {
    type: String,
    required: true
  }
})

const userAuthorized = computed(() => {
  return auth.currentUser?.uid === props.comment.uid
})

const formattedComment = computed(() => {
  const formattedTime = formatDistanceToNow(new Date(props.comment.datePosted))

  return `${formattedTime} ago`
})

onMounted(() => {
  console.log(props.comment)
  console.log(formattedComment.value)
  console.log(props.song.docID)
  console.log(props.id)
})

const deleteComment = async () => {
  await cmtCollection.doc(props.comment.docID).delete()
  // eslint-disable-next-line vue/no-mutating-props
  props.song.comment_count -= 1
  await songsCollection.doc(props.id).update({
    comment_count: props.song.comment_count
  })

}

</script>

<style></style>
