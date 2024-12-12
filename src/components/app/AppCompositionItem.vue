<template>
  <div class="p-3 mb-4 border border-gray-200 rounded">
    <div v-if="!showForm" class="flex flex-wrap items-start">
      <!-- Song Name -->
      <h4 class="flex-1 inline-block font-bold break-words text-md me-3">
        {{ props.song.modified_name }}
      </h4>

      <!-- Buttons -->
      <div class="flex items-center space-x-2">
        <button @click.prevent="showForm = !showForm"
          class="px-2 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
          <i class="fa fa-pencil-alt"></i>
        </button>
        <button @click.prevent="deleteSong" class="px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700">
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>

    <!-- Form Section -->
    <div v-if="showForm">
      <div v-if="show_alert" :class="[alert_variant, 'p-4 mb-4 font-bold text-center text-white']">
        {{ alert_msg }}
      </div>
      <VeeForm @submit="updateSong" :validation-schema="songSchema" :initial-values="songData">
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('manage.song_name') }}</label>
          <VeeField name="modified_name" type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title" @input="props.updateUnsavedFlag(true)" />
          <ErrorMessage class="text-red-600" name="modified_name"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('manage.song_genre') }}</label>
          <VeeField name="genre" type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre" @input="props.updateUnsavedFlag(true)" />
          <ErrorMessage class="text-red-600" name="genre"></ErrorMessage>
        </div>
        <button :disabled="in_submission" type="submit" class="py-1.5 px-3 rounded text-white bg-green-600">
          {{ $t('manage.update_btn') }}
        </button>
        <button :disabled="in_submission" @click.prevent="showForm = !showForm" type="button"
          class="ms-3 py-1.5 px-3 rounded text-white bg-gray-600">
          {{ $t('manage.bck_btn') }}
        </button>
      </VeeForm>
    </div>
  </div>
</template>

<script setup>
import { songsCollection, storage } from '@/includes/firebase';
import { ErrorMessage } from 'vee-validate';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const props = defineProps({
  song: {
    type: Object,
    required: true
  },
  updateUnsavedFlag: {
    type: Function
  }
})

const showForm = ref(false)
const in_submission = ref(false)
const show_alert = ref(false)
const alert_variant = ref('bg-blue-500')
const alert_msg = ref(t('manage.update_progress'))

const songSchema = reactive({
  modified_name: 'required',
  genre: 'alpha_spaces'
})

const songData = reactive({
  modified_name: props.song.modified_name,
  genre: props.song.genre
})

const updateSong = async (values) => {
  console.log(values)
  in_submission.value = true
  show_alert.value = true
  /**
   * ? It's already set to the bg-blue-500 by default.
   * ? But we want to make sure to reset it if the user resumbits the form.
   * ? alert_msg as well.
   */
  alert_variant.value = 'bg-blue-500'
  alert_msg.value = t('manage.update_progress')

  try {
    /**
     * ? doc() allows you to select a document by its ID
     * ? update() will allow you to update any of the properties inside it.
     */
    await songsCollection.doc(props.song.docID).update(values)
  }
  catch (error) {
    console.log(error.message)
    in_submission.value = false
    alert_variant.value = 'bg-red-600'
    alert_msg.value = t('manage.update_error')
    return
  }

  /**
   * $ When user saves the changes, we will turn the flag off.
   */
  props.updateUnsavedFlag(false)

  in_submission.value = false
  alert_variant.value = 'bg-green-500'
  alert_msg.value = t('manage.update_success')
  setTimeout(() => {
    show_alert.value = false
  }, 2000)
}

const deleteSong = async () => {
  /**
   * ? Delete song from firebase storage
   */
  const storageRef = storage.ref()
  const songRef = storageRef.child(`songs/${props.song.original_name}`)

  await songRef.delete()
  /**
   * ? Delete song from firebase firestore by docID
   */
  await songsCollection.doc(props.song.docID).delete()
}
</script>

<style></style>
