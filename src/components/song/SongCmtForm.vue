<template>
  <div v-if="cmt_show_alert" :class="[cmt_alert_variant, 'p-4 mb-4 font-bold text-center text-white']">
    {{ cmt_alert_msg }}
  </div>
  <VeeForm @submit="addComment" :validation-schema="cmtSchema">
    <VeeField as="textarea" name="comment" style="resize: none" rows="5"
      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
      placeholder="Your comment here..."></VeeField>
    <ErrorMessage class="text-red-600 " name="comment" />
    <button :disabled="cmt_in_submission" type="submit" class="py-1.5 px-3 rounded text-white bg-green-600 block">
      Submit
    </button>
  </VeeForm>
</template>

<script setup>
import { auth, cmtCollection } from '@/includes/firebase';
import { reactive, ref } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const cmt_in_submission = ref(false)
const cmt_show_alert = ref(false)
const cmt_alert_variant = ref('bg-blue-500')
const cmt_alert_msg = ref('Please wait! Your comment is being submitted.')

const cmtSchema = reactive({
  comment: 'required|min:3'
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
    sid: props.id,
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
  setTimeout(() => {
    cmt_show_alert.value = false
  }, 2000)

  resetForm()
}
</script>

<style></style>
