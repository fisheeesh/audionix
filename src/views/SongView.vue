<template>
  <!-- Music Header -->
  <section class="relative w-full mb-8 text-center text-white py-14">
    <div class="box-border absolute inset-0 w-full h-full bg-contain music-bg"
      style="background-image: url(/assets/img/song-header.png)"></div>
    <div class="container flex items-center mx-auto">
      <!-- Play/Pause Button -->
      <button type="button" class="z-50 w-24 h-24 text-3xl text-black bg-white rounded-full focus:outline-none">
        <i class="fas fa-play"></i>
      </button>
      <div class="z-50 ml-8 text-left">
        <!-- Song Info -->
        <div class="text-3xl font-bold">{{ song.modified_name }}</div>
        <div>{{ song.genre ? song.genre : 'N/A' }}</div>
      </div>
    </div>
  </section>
  <!-- Form -->
  <section class="container mx-auto mt-6">
    <div class="relative flex flex-col bg-white border border-gray-200 rounded">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">Comments ({{ comments.length }})</span>
        <i class="float-right text-2xl text-green-400 fa fa-comments"></i>
      </div>
      <div class="p-6">
        <SongCmtForm v-if="userStore.userLoggedIn" :id="route.params.id" />
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
</template>

<script setup>
import SongCmtForm from '@/components/song/SongCmtForm.vue';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { cmtCollection, songsCollection } from '@/includes/firebase';
import { useRouter } from 'vue-router';
import SongComment from '@/components/song/SongComment.vue';

const router = useRouter()
const route = useRoute()

const song = ref({})
const comments = ref([])
const userStore = useUserStore()
let sort = ref("1")

onMounted(() => {
  /**
   * ? Fetching song by specific docID
   */
  songsCollection.doc(route.params.id).onSnapshot(doc => {
    // console.log(doc.data())
    if (!doc.exists) {
      router.push({ name: 'home' })
      return
    }
    song.value = doc.data()
  })

  /**
   * ? Fetching all commnets according to song id
   */
  cmtCollection.where('sid', '==', route.params.id).onSnapshot(snap => {
    let result = [];
    snap.docs.forEach(doc => {
      let comment = { ...doc.data(), docID: doc.id };
      result.push(comment);
    });
    console.log("Fetched comments: ", result);
    comments.value = result;
  });
})

const sortedComments = computed(() => {
  console.log("Sorting triggered: ", sort.value);
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
    if (sort.value === "1") {
      return new Date(b.datePosted) - new Date(a.datePosted)
    }

    if (sort.value === "2") {
      return new Date(a.datePosted) - new Date(b.datePosted)
    }
  })
})

</script>

<style></style>
