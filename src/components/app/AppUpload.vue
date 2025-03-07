<template>
  <div class="relative flex flex-col bg-white border border-gray-200 rounded">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">{{ $t('manage.song_upload') }}</span>
      <i class="float-right text-2xl text-green-400 fas fa-upload"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        class="w-full px-10 py-20 text-center text-gray-400 transition duration-500 border border-gray-400 border-dashed rounded cursor-pointer hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        @drag.prevent.stop="" @dragstart.prevent.stop="" @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true" @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false" @drop.prevent.stop="upload($event)">
        <h5>{{ $t('manage.song_drop') }}</h5>
      </div>
      <input type="file" multiple @change="upload($event)">
      <hr class="my-6 " />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div v-if="upload.status === 'progress'" class="text-sm font-bold" :class="upload.text_class">
          <span><i class="fas fa-spinner fa-spin"></i></span> {{ upload.name }}
        </div>
        <div v-else-if="upload.status === 'success'" class="text-sm font-bold" :class="upload.text_class">
          <span><i class="fas fa-check"></i></span> {{ upload.name }}
        </div>
        <div v-else class="text-sm font-bold" :class="upload.text_class">
          <span><i class="fas fa-circle-exclamation"></i></span> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded ">
          <!-- Inner Progress Bar -->
          <div class="transition-all progress-bar" :class="upload.variant"
            :style="{ width: upload.current_progress + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { auth, songsCollection, storage } from '@/includes/firebase';
import { onBeforeUnmount, ref } from 'vue';

const is_dragover = ref(false)
const uploads = ref([])
/**
 * ? $event is same obj wiht any other JS event
 */
const upload = ($event) => {
  is_dragover.value = false

  /***
   * ? If your're trying to debug drag and drop operations, you need to access the properties directly to see thier values.
   * ? Simply loggin the obj in general will result in an empty array.
   * ? We dun have acess to the looping func that come with the array obj
   * ? So we need to change into an array by using the spread operator
   */
  // const { files } = $event.dataTransfer
  // console.log($event)
  const files = $event.dataTransfer
    ? [...$event.dataTransfer.files]
    : [...$event.target.files]

  files.forEach(file => {
    if (file.type !== 'audio/mpeg') {
      return
    }

    /**
     * ? We are creating a ref to the storage. The ref represents the path in our storage AKA the bucket URL (music-b055.firebasestorage.app)
     * ? By creating a route ref, you can easily create more reef without having to call the same methods repeatedly.
    */
    const storageRef = storage.ref() // music-b055.firebasestorage.app
    const songsRef = storageRef.child(`songs/${file.name}`) // music-b055.firebasestorage.app/songs/example.mp3

    /**
     * ? The task obj stores a copy of current snapshot
     */
    const task = songsRef.put(file)

    const uploadIndex = uploads.value.push({
      task,
      current_progress: 0,
      name: file.name,
      variant: 'bg-blue-400',
      status: "progress",
      text_class: ''
    }) - 1

    /**
     * ? on() will trigger every time file uploads
     */
    task.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      uploads.value[uploadIndex].current_progress = progress
    }, (error) => {
      uploads.value[uploadIndex].status = "error"
      uploads.value[uploadIndex].variant = 'bg-red-600'
      uploads.value[uploadIndex].text_class = 'text-red-600'
      console.log(error)
    }, async () => {

      const songs = {
        uid: auth.currentUser.uid,
        display_name: auth.currentUser.displayName,
        original_name: task.snapshot.ref.name,
        modified_name: task.snapshot.ref.name,
        genre: '',
        comment_count: 0,
      }

      songs.url = await task.snapshot.ref.getDownloadURL()

      await songsCollection.add(songs)

      uploads.value[uploadIndex].status = "success"
      uploads.value[uploadIndex].variant = 'bg-green-400'
      uploads.value[uploadIndex].text_class = 'text-green-400'
    })
  })
}

/**
 * ? When you navigate to another page, the component from the previous page wil unmounted.
 * ? This applies to children comp too.
 * ? Vue will take care of cleaning up (data, methods, computed) properties after a component has been unmounted. (to free memory in user machine)
 * ! But it won't clean the req made by user.
 * ? Simple req won't tax the application. But a file upload can.
 * ? 2 life cycle hooks are when comp is ummounted.
 * $ So, it is perfect to cancel the req if user navigates away from the page.
 */
onBeforeUnmount(() => {
  uploads.value.forEach(upload => {
    /**
     * ? The task will come with a method call cancel() to cancel the req.
     * ! We can only cancel each upload once at time.
     * ? That's why we need to loop through each upload
     */
    upload.task.cancel()
  })
})

// const cancelUploads = () => {
//   uploads.value.forEach(upload => {
//     upload.task.cancel()
//   })
// }


</script>

<style></style>
