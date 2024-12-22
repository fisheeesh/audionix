<template>
  <main>
    <!-- Introduction -->
    <section class="relative py-20 mb-8 text-center text-white">
      <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="mb-5 text-5xl font-bold">{{ $t('home.listen') }}</h1>
          <p class="w-full mx-auto md:w-8/12">
            {{ $t('home.content') }}
          </p>
        </div>
      </div>

      <img class="relative block w-auto max-w-full mx-auto mt-5 -mb-20" src="/assets/img/introduction-music.png" />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="relative flex flex-col bg-white border border-gray-200 rounded">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">{{ $t('home.playlist_title') }}</span>
          <!-- Icon -->
          <i class="float-right text-2xl text-green-400 fas fa-headphones-alt"></i>
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <SongItem v-for="song in songs" :key="song.docID" :song="song" />
        </ol>
      </div>
    </section>
    <div v-if="pendingRequest" class="py-4 my-3 text-center">
      <PulseLoader />
    </div>
    <div v-if="noMoreSongs" class="py-4 text-center text-gray-500">
      <span>{{ $t('home.no_songs') }}</span>
    </div>
  </main>
</template>

<script setup>
import SongItem from '@/components/song/SongItem.vue';
import { songsCollection } from '@/includes/firebase';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const songs = ref([]);
const maxPerPage = ref(7);
const pendingRequest = ref(false);
const noMoreSongs = ref(false);

onMounted(() => {
  getSongs();

  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  /**
   * ? Stop fetching if there are no more songs or if a request is already in progress
   *  */
  if (noMoreSongs.value || pendingRequest.value) {
    return;
  }

  const { scrollTop, offsetHeight } = document.documentElement;
  const { innerHeight } = window;
  const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

  /**
 * $ Alternative Option Solution (less strict)
 * $ const bottomOfWindow = Math.round(scrollTop) + innerHeight > offsetHeight -100
 * ? scrollTop has to wrap with Math.round() cuz it may have decimal number
 */

  if (bottomOfWindow) {
    console.log('Bottom of window');
    getSongs();
  }
};

const getSongs = async () => {
  /**
   * ? Prevent fetching if already pending or no more songs to load
   */
  if (pendingRequest.value || noMoreSongs.value) {
    return;
  }

  pendingRequest.value = true;

  let snapshots;

  if (songs.value.length) {
    const lastDoc = await songsCollection.doc(songs.value[songs.value.length - 1].docID).get();
    snapshots = await songsCollection
      .orderBy('modified_name')
      .startAfter(lastDoc)
      .limit(maxPerPage.value)
      .get();
  } else {
    snapshots = await songsCollection
      .orderBy('modified_name')
      .limit(maxPerPage.value)
      .get();
  }

  if (snapshots.empty) {
    noMoreSongs.value = true;
  } else {
    snapshots.forEach(doc => {
      songs.value.push({
        docID: doc.id,
        ...doc.data()
      });
    });
  }

  /**
   * ?If fewer songs are fetched than the maxPerPage limit, mark that there are no more songs
   */
  if (snapshots.size < maxPerPage.value) {
    noMoreSongs.value = true;
  }

  pendingRequest.value = false;
};
</script>

<style></style>
