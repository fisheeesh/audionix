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
        <SongItem v-for="song in songStore.songs" :key="song.docID" :song="song" />
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</template>

<script setup>
import SongItem from '@/components/app/SongItem.vue';
import { useSongStore } from '@/stores/song';
import { onBeforeUnmount, onMounted } from 'vue';

const songStore = useSongStore()

onMounted(() => {
  getSongs()

  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const getSongs = () => {
  songStore.getAllSongs()
}

const handleScroll = () => {
  const { scrollTop, offsetHeight } = document.documentElement
  const { innerHeight } = window
  /**
   * $ Alternative Option Solution (less strict)
   * ? scrollTop has to wrap with Math.round() cuz it may have decimal number
   */
  // const bottomOfWindow = Math.round(scrollTop) + innerHeight > offsetHeight -100
  const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

  if (bottomOfWindow) {
    console.log('Bottom of window')
  }
}

</script>

<style></style>
