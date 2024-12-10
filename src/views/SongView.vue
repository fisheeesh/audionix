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
        <div v-if="cmt_show_alert" :class="[cmt_alert_variant, 'p-4 mb-4 font-bold text-center text-white']">
          {{ cmt_alert_msg }}
        </div>
        <VeeForm v-if="userStore.userLoggedIn" @submit="addComment" :validation-schema="cmtSchema">
          <VeeField as="textarea" name="comment" style="resize: none" rows="5"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."></VeeField>
          <ErrorMessage class="text-red-600 " name="comment" />
          <button :disabled="cmt_in_submission" type="submit" class="py-1.5 px-3 rounded text-white bg-green-600 block">
            Submit
          </button>
        </VeeForm>
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
import { auth, cmtCollection, songsCollection } from '@/includes/firebase';
import { useUserStore } from '@/stores/user';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const song = ref({})

const cmt_in_submission = ref(false)
const cmt_show_alert = ref(false)
const cmt_alert_variant = ref('bg-blue-500')
const cmt_alert_msg = ref('Please wait! Your comment is being submitted.')

const cmtSchema = reactive({
  comment: 'required|min:3'
})

onMounted(() => {
  songsCollection.doc(route.params.id).onSnapshot(doc => {
    // console.log(doc.data())
    if (!doc.exists) {
      router.push({ name: 'home' })
      return
    }
    song.value = doc.data()
  })
})

/**
 * $ Second argument content is optional which is obj.
 * ? It contains methods and properties about our form.
 * ? In our case, we can use it to reset the form.
 * ? By destructing the content obj, we will have access to use resetForm()
 */
const addComment = async (values, { resetForm }) => {
  console.log(values)
  cmt_in_submission.value = true
  cmt_show_alert.value = true
  cmt_alert_variant.value = 'bg-blue-500'
  cmt_alert_msg.value = 'Please wait! Your comment is being submitted.'

  const comment = {
    content: values.comment,
    datePosted: new Date().toString(),
    sid: route.params.id,
    name: auth.currentUser.displayName,
    uid: auth.currentUser.uid
  }

  try {
    await cmtCollection.add(comment)
  }
  catch (err) {
    console.log(err.message)
    cmt_in_submission.value = false
    cmt_alert_variant.value = 'bg-red-500'
    cmt_alert_msg.value = 'Something went wrong. Please try again later.'
    return
  }

  cmt_in_submission.value = false
  cmt_alert_variant.value = 'bg-green-500'
  cmt_alert_msg.value = 'Success! Comment added.'

  resetForm()
}

</script>

<style></style>
