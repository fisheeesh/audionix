<template>
  <main>
    <!-- Music Header -->
    <section class="relative w-full mb-8 text-center text-white py-14">
      <div class="box-border absolute inset-0 w-full h-full bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"></div>
      <div class="container flex items-center mx-auto">
        <!-- Play/Pause Button -->
        <button @click.prevent="playerStore.newSong(song)" type="button"
          class="z-50 flex items-center justify-center w-24 h-24 text-3xl text-black bg-white rounded-full focus:outline-none">
          <span class="text-gray-600 material-symbols-outlined" style="font-size: 40px">
            {{ playerStore.playing ? 'motion_photos_paused' : 'motion_play' }}
          </span>
        </button>
        <div class="z-50 ml-8 text-left">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre ? song.genre : 'N/A' }}</div>
          <!-- <div class="song-price">{{ $n(1, "currency", "ja") }}</div> -->
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div class="relative flex flex-col bg-white border border-gray-200 rounded">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">
            {{
              song.comment_count !== undefined
                ? $t('song.comment_count', song.comment_count, { count: song.comment })
                : $t('song.comment_count', { count: 0 })
            }}
          </span>
          <i class="float-right text-2xl text-green-400 fa fa-comments"></i>
        </div>
        <div class="p-6">
          <SongCmtForm v-if="userStore.userLoggedIn" :id="route.params.id" :song="song" />
          <!-- Sort Comments -->
          <select v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <SongComment v-for="comment in sortedComments" :key="comment.docID" :comment="comment" />
    </ul>
  </main>
</template>

<script setup>
import SongCmtForm from '@/components/song/SongCmtForm.vue'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { cmtCollection, songsCollection } from '@/includes/firebase'
import { useRouter } from 'vue-router'
import SongComment from '@/components/song/SongComment.vue'
import { usePlayerStore } from '@/stores/player'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const playerStore = usePlayerStore()

const song = ref({})
const comments = ref([])
const sort = ref('1')

onMounted(() => {
  /**
   * ? Fetching song by specific docID
   */
  songsCollection.doc(route.params.id).onSnapshot((doc) => {
    // console.log(doc.data())
    if (!doc.exists) {
      router.push({ name: 'home' })
      return
    }
    song.value = doc.data()
  })

  /**
   * $ If there is a query para in the URL, if there is one, we will assign it to the sort data.
   * ? route obj contains all the info about the current route.
   * ? router obj is a general obj for interacting with the router in the application.
   * ! There is one prolbem with this solution, we're updateing these sort property.
   * ! This update will trigger the watch() for the callback func regardless if the value changed or not.
   * ! Vue will throw an error if we attempt to visit a URL we're already visiting.
   * $ To overcome this error by checking if the new value matches the query parameter.
   */
  const { _sort } = route.query
  sort.value = _sort === '1' || _sort === '2' ? _sort : '1'

  /**
   *
   * ? Fetching all commnets according to song id
   */
  cmtCollection.where('sid', '==', route.params.id).onSnapshot((snap) => {
    let result = []
    snap.docs.forEach((doc) => {
      let comment = { ...doc.data(), docID: doc.id }
      result.push(comment)
    })
    comments.value = result
  })
})

const sortedComments = computed(() => {
  console.log('Sorting triggered: ', sort.value)
  /**
   * $ We will get an error if we call sort() directly.
   * ? Cus the sort array func will change the way it's being called on.
   * ? computed properties may use data properties, but tehy shouldn't chagne them, at least directly.
   * $ That's why we are getting an error.
   * ? To overcome this, before calling sort() we will call the slice()
   * ? slice() returns a brand new array based on the old array
   * ?
   */
  return comments.value.slice().sort((a, b) => {
    /**
     * ? Before making comparison, we first check if the ordering should be ascending or descending.
     * ? If it's 1, it will be latest to oldest.
     * ? If it's 2, it will be oldest to latest.
     */
    if (sort.value === '1') {
      return new Date(b.datePosted) - new Date(a.datePosted)
    }

    if (sort.value === '2') {
      return new Date(a.datePosted) - new Date(b.datePosted)
    }
  })
})

/**
 * ? As soon as the sort value changes, we want to update the route.
 * ? We want to add a query parameter to the current routes.
 * ? push() accepts an obj that the changes we'd like to make to the current routes.
 * ? Like the way { name : 'home' }
 * ? query(obj) para uses key:value.
 * ? The router will take care of converting this from an obj to a string.
 * ? That will be appended to the URL.
 */
watch(sort, (newVal) => {
  /**
   * ? If the new value matches the query parameter, we will return the function.
   * ? This condi will prevent the watcher from updating the route if the query parameter already matches.
   */
  if (newVal === route.query._sort) {
    return
  }
  router.push({ query: { _sort: newVal } })
})
</script>

<style></style>
