<template>
  <!-- Introduction -->
  <section class="relative py-20 mb-8 text-center text-white">
    <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/header.png)"></div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="mb-5 text-5xl font-bold">Listen to Great Music!</h1>
        <p class="w-full mx-auto md:w-8/12">
          Discover an incredible collection of music that soothes your soul, energizes your day, and inspires
          creativity. Whether you're into timeless classics or the latest hits, there's something here for everyone.
          Start your journey to musical bliss today!
        </p>
      </div>
    </div>

    <img class="relative block w-auto max-w-full mx-auto mt-5 -mb-20" src="/assets/img/introduction-music.png" />
  </section>

  <!-- Main Content -->
  <section class="container mx-auto">
    <div class="relative flex flex-col bg-white border border-gray-200 rounded">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Songs</span>
        <!-- Icon -->
        <i class="float-right text-xl text-green-400 fa fa-headphones-alt"></i>
      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <SongItem v-for="song in songs" :key="song.docID" :song="song"/>
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</template>

<script setup>
import SongItem from '@/components/app/SongItem.vue';
import { songsCollection } from '@/includes/firebase';
import { onMounted, ref } from 'vue';

const songs = ref([])

onMounted(async () => {
  songsCollection.onSnapshot(snap => {
    // console.log(snap)
    // console.log(snap.docs)
    let result = []
    snap.docs.forEach(doc => {
      // console.log(doc)
      // console.log(doc.data())
      let song = { ...doc.data(), docID: doc.id }

      result.push(song)
    })
    songs.value = result
  })
})

</script>

<style></style>
