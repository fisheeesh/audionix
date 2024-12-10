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
        <span class="card-title">Comments (15)</span>
        <i class="float-right text-2xl text-green-400 fa fa-comments"></i>
      </div>
      <div class="p-6">
        <form>
          <textarea
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."></textarea>
          <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600 block">
            Submit
          </button>
        </form>
        <!-- Sort Comments -->
        <select
          class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>
      </div>
    </div>
  </section>
  <!-- Comments -->
  <ul class="container mx-auto">
    <li class="p-6 border border-gray-200 bg-gray-50">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium der doloremque laudantium.
      </p>
    </li>
    <li class="p-6 border border-gray-200 bg-gray-50">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium der doloremque laudantium.
      </p>
    </li>
    <li class="p-6 border border-gray-200 bg-gray-50">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium der doloremque laudantium.
      </p>
    </li>
    <li class="p-6 border border-gray-200 bg-gray-50">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium der doloremque laudantium.
      </p>
    </li>
    <li class="p-6 border border-gray-200 bg-gray-50">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium der doloremque laudantium.
      </p>
    </li>
    <li class="p-6 border border-gray-200 bg-gray-50">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium der doloremque laudantium.
      </p>
    </li>
  </ul>
</template>

<script setup>
import { songsCollection } from '@/includes/firebase';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const song = ref({})

onMounted(() => {
  songsCollection.doc(route.params.id).onSnapshot(doc => {
    // console.log(doc.data())
    if(!doc.exists){
      router.push({ name: 'home' })
      return
    }
    song.value = doc.data()
  })
})

</script>

<style></style>
