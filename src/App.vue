<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container flex items-center justify-start px-4 py-5 mx-auto">
      <!-- App Name -->
      <a class="mr-4 text-2xl font-bold text-white uppercase" href="#">Music</a>

      <div class="flex items-center flex-grow">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <a class="px-2 text-white" href="#">Login / Register</a>
          </li>
          <li>
            <a class="px-2 text-white" href="#">Manage</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <!-- Introduction -->
  <section class="relative py-20 mb-8 text-center text-white">
    <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/header.png)"></div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="mb-5 text-5xl font-bold">Listen to Great Music!</h1>
        <p class="w-full mx-auto md:w-8/12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
          suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
          pulvinar, fringilla lorem eget, ullamcorper urna.
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
  <div class="fixed inset-0 z-10 hidden overflow-y-auto" id="modal">
    <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="px-6 py-4 text-left">
          <!--Title-->
          <div class="flex items-center justify-between pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="z-50 cursor-pointer modal-close">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a class="block px-4 py-3 text-white transition bg-blue-600 rounded hover:text-white" href="#">Login</a>
            </li>
            <li class="flex-auto text-center">
              <a class="block px-4 py-3 transition rounded" href="#">Register</a>
            </li>
          </ul>

          <!-- Login Form -->
          <form>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <input type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <input type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password" />
            </div>
            <button type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
              Submit
            </button>
          </form>
          <!-- Registration Form -->
          <form>
            <!-- Name -->
            <div class="mb-3">
              <label class="inline-block mb-2">Name</label>
              <input type="text"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name" />
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <input type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" />
            </div>
            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2">Age</label>
              <input type="number"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded" />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <input type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password" />
            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Confirm Password</label>
              <input type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password" />
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2">Country</label>
              <select
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
            <!-- TOS -->
            <div class="pl-6 mb-3">
              <input type="checkbox" class="float-left w-4 h-4 mt-1 -ml-6 rounded" />
              <label class="inline-block">Accept terms of service</label>
            </div>
            <button type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style></style>
