<template>
  <div v-if="log_in_show_alert" :class="[log_in_alert_variant, 'p-4 mb-4 font-bold text-center text-white rounded']">
    {{ log_in_alert_msg }}
  </div>
  <vee-form @submit="logIn" :validation-schema="loginSchema">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field name="email" type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email" />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password" />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button :disabled="log_in_submission" type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
      Submit
    </button>
  </vee-form>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { reactive, ref } from 'vue'

const userStore = useUserStore()

const loginSchema = reactive({
  email: 'required|min:3|max:100|email',
  password: 'required|min:8|max:100|excluded:password'
})

const log_in_submission = ref(false)
const log_in_show_alert = ref(false)
const log_in_alert_variant = ref('bg-blue-500')
const log_in_alert_msg = ref('Please wait! We are loggging you in.')

const logIn = async (values) => {
  log_in_submission.value = true
  log_in_show_alert.value = true
  log_in_alert_variant.value = 'bg-blue-500'
  log_in_alert_msg.value = 'Please wait! We are logging you in.'

  try {
    await userStore.authenticate(values)
  }
  catch (error) {
    console.log(error.message)
    log_in_submission.value = false
    log_in_alert_variant.value = 'bg-red-500'
    log_in_alert_msg.value = 'Invalid login details.'
    return
  }

  log_in_alert_variant.value = 'bg-green-500'
  log_in_alert_msg.value = 'Success! You are now logged in.'
  window.location.reload()
}
</script>

<style></style>
