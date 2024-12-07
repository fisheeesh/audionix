<template>
  <!-- Header -->
  <AppHeader />

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
        <li class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50">
          <div>
            <a href="#" class="block font-bold text-gray-600">Song Title</a>
            <span class="text-sm text-gray-500">Artist Name</span>
          </div>

          <div class="text-lg text-gray-600">
            <span class="comments">
              <i class="text-gray-600 fa fa-comments"></i>
              15
            </span>
          </div>
        </li>
        <li class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50">
          <div>
            <a href="#" class="block font-bold text-gray-600">Song Title</a>
            <span class="text-sm text-gray-500">Artist Name</span>
          </div>

          <div class="text-lg text-gray-600">
            <span class="comments">
              <i class="text-gray-600 fa fa-comments"></i>
              15
            </span>
          </div>
        </li>
        <li class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50">
          <div>
            <a href="#" class="block font-bold text-gray-600">Song Title</a>
            <span class="text-sm text-gray-500">Artist Name</span>
          </div>

          <div class="text-lg text-gray-600">
            <span class="comments">
              <i class="text-gray-600 fa fa-comments"></i>
              15
            </span>
          </div>
        </li>
        <li class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50">
          <div>
            <a href="#" class="block font-bold text-gray-600">Song Title</a>
            <span class="text-sm text-gray-500">Artist Name</span>
          </div>

          <div class="text-lg text-gray-600">
            <span class="comments">
              <i class="text-gray-600 fa fa-comments"></i>
              15
            </span>
          </div>
        </li>
        <li class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50">
          <div>
            <a href="#" class="block font-bold text-gray-600">Song Title</a>
            <span class="text-sm text-gray-500">Artist Name</span>
          </div>

          <div class="text-lg text-gray-600">
            <span class="comments">
              <i class="text-gray-600 fa fa-comments"></i>
              15
            </span>
          </div>
        </li>
        <li class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50">
          <div>
            <a href="#" class="block font-bold text-gray-600">Song Title</a>
            <span class="text-sm text-gray-500">Artist Name</span>
          </div>

          <div class="text-lg text-gray-600">
            <span class="comments">
              <i class="text-gray-600 fa fa-comments"></i>
              15
            </span>
          </div>
        </li>
        <li class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50">
          <div>
            <a href="#" class="block font-bold text-gray-600">Song Title</a>
            <span class="text-sm text-gray-500">Artist Name</span>
          </div>

          <div class="text-lg text-gray-600">
            <span class="comments">
              <i class="text-gray-600 fa fa-comments"></i>
              15
            </span>
          </div>
        </li>
        <li class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50">
          <div>
            <a href="#" class="block font-bold text-gray-600">Song Title</a>
            <span class="text-sm text-gray-500">Artist Name</span>
          </div>

          <div class="text-lg text-gray-600">
            <span class="comments">
              <i class="text-gray-600 fa fa-comments"></i>
              15
            </span>
          </div>
        </li>
        <li class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50">
          <div>
            <a href="#" class="block font-bold text-gray-600">Song Title</a>
            <span class="text-sm text-gray-500">Artist Name</span>
          </div>

          <div class="text-lg text-gray-600">
            <span class="comments">
              <i class="text-gray-600 fa fa-comments"></i>
              15
            </span>
          </div>
        </li>
        <li class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50">
          <div>
            <a href="#" class="block font-bold text-gray-600">Song Title</a>
            <span class="text-sm text-gray-500">Artist Name</span>
          </div>

          <div class="text-lg text-gray-600">
            <span class="comments">
              <i class="text-gray-600 fa fa-comments"></i>
              15
            </span>
          </div>
        </li>
        <li class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50">
          <div>
            <a href="#" class="block font-bold text-gray-600">Song Title</a>
            <span class="text-sm text-gray-500">Artist Name</span>
          </div>

          <div class="text-lg text-gray-600">
            <span class="comments">
              <i class="text-gray-600 fa fa-comments"></i>
              15
            </span>
          </div>
        </li>
        <li class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50">
          <div>
            <a href="#" class="block font-bold text-gray-600">Song Title</a>
            <span class="text-sm text-gray-500">Artist Name</span>
          </div>

          <div class="text-lg text-gray-600">
            <span class="comments">
              <i class="text-gray-600 fa fa-comments"></i>
              15
            </span>
          </div>
        </li>
        <li class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50">
          <div>
            <a href="#" class="block font-bold text-gray-600">Song Title</a>
            <span class="text-sm text-gray-500">Artist Name</span>
          </div>

          <div class="text-lg text-gray-600">
            <span class="comments">
              <i class="text-gray-600 fa fa-comments"></i>
              15
            </span>
          </div>
        </li>
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>

  <!-- Player -->
  <div class="fixed bottom-0 left-0 w-full px-4 py-2 bg-white">
    <!-- Track Info -->
    <div class="text-center">
      <span class="font-bold song-title">Song Title</span> by
      <span class="song-artist">Artist</span>
    </div>
    <div class="flex items-center gap-4 flex-nowrap">
      <!-- Play/Pause Button -->
      <button type="button">
        <i class="text-xl text-gray-500 fa fa-play"></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">00:00</div>
      <!-- Scrub Container  -->
      <div class="relative w-full h-2 bg-gray-200 rounded cursor-pointer">
        <!-- Player Ball -->
        <span class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg" style="left: 50%">
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400" style="width: 50%"></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">03:06</div>
    </div>
  </div>

  <!-- Auth Modal -->
  <AppAuth />
</template>

<script setup>
import AppAuth from './components/AppAuth.vue';
import AppHeader from './components/AppHeader.vue';
</script>

<style></style>
