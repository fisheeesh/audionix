<template>
  <div class="fixed bottom-0 left-0 w-full px-4 py-2 bg-white">
    <!-- Track Info -->
    <div class="text-center" v-if="playerStore.currentSong.modified_name">
      <span class="font-bold song-title">{{ playerStore.currentSong.modified_name }}</span> by
      <span class="song-artist">{{ playerStore.currentSong.display_name }}</span>
    </div>
    <div class="flex items-center gap-4 flex-nowrap">
      <!-- Play/Pause Button -->
      <button @click.prevent="playerStore.toggleAudio" type="button">
        <span class="mt-1.5 text-grey-600 material-symbols-outlined">
          {{ playerStore.playing ? 'pause_circle' : 'play_circle' }}
        </span>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">{{ playerStore.seek }}</div>
      <!-- Scrub Container  -->
      <div class="relative w-full h-2 bg-gray-200 rounded cursor-pointer">
        <!-- Player Ball -->
        <span class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg" :style="{ left: playerStore.playerProgress }">
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          :style="{ width: playerStore.playerProgress }"></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">{{ playerStore.duration }}</div>
    </div>
  </div>
</template>

<script setup>
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore()
</script>

<style></style>
