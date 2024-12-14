<template>
  <div v-if="reg_show_alert" :class="[reg_alert_variant, 'p-4 mb-4 font-bold text-center text-white rounded']">
    {{ reg_alert_msg }}
  </div>
  <vee-form @submit="register" :validation-schema="schema" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.form.name') }}</label>
      <vee-field name="name" type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('auth.placeholder.name')" />
      <!-- The ErrorMessage comp will generate a span tag -->
      <ErrorMessage class="text-red-600 text" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.form.email') }}</label>
      <vee-field name="email" type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('auth.placeholder.email')"  />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.form.age') }}</label>
      <vee-field type="number" name="age" :placeholder="$t('auth.placeholder.age')"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded" />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.form.password') }}</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          :placeholder="$t('auth.placeholder.password')"  v-bind="field" />
        <div class="text-red-600" v-for="(error, index) in errors" :key="index">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.form.confirm_password') }}</label>
      <vee-field name="confirm_password" type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('auth.placeholder.confirm_password')"  />
      <ErrorMessage class="text-red-600 text" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.form.country') }}</label>
      <vee-field as="select" name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Myanmar">Myanmar</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <ErrorMessage class="text-red-600 text" name="country" />
    </div>
    <!-- User Role -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.form.type') }}</label>
      <vee-field as="select" name="type"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
        <option value="Listener">Listener</option>
        <option value="Artist">Artist</option>
        <option value="Producer">Producer</option>
      </vee-field>
      <ErrorMessage class="text-red-600 text" name="type" />
    </div>
    <!-- TOS -->
    <div class="pl-6 mb-3">
      <vee-field name="tos" value="1" type="checkbox" class="float-left w-4 h-4 mt-1 -ml-6 rounded" />
      <i18n-t class="inline-block" keypath="register.accept" tag="label">
        <a href="#">{{ $t("register.tos") }}</a>
      </i18n-t>
      <ErrorMessage class="block text-red-600 text" name="tos" />
    </div>
    <button type="submit" :disabled="reg_in_submission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
      {{ $t('auth.form.register') }}
    </button>
  </vee-form>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const userStore = useUserStore()

const schema = reactive({
  /**
   * ? If we want to add additional rules, we can separate each rule with '|'
   */
  name: 'required|min:3|max:100|alpha_spaces',
  email: 'required|min:3|max:100|email',
  age: 'required|min_value:18|max_value:100',
  password: 'required|min:9|max:100|excluded:password',
  confirm_password: 'passwords_mismatch:@password',
  country: 'required|country_excluded:Antarctica',
  type: 'required',
  tos: 'tos'
})

const userData = reactive({
  country: 'USA',
  type: 'Listener'
})

const reg_in_submission = ref(false)
const reg_show_alert = ref(false)
const reg_alert_variant = ref('bg-blue-500')
const reg_alert_msg = ref(t('auth.form.register_progress'))

const register = async (values) => {
  reg_show_alert.value = true
  reg_in_submission.value = true
  reg_alert_variant.value = 'bg-blue-500'
  reg_alert_msg.value = t('auth.form.register_progress')

  try {
    await userStore.register(values)
  }
  catch (error) {
    console.log(error.message)
    reg_in_submission.value = false
    reg_alert_variant.value = 'bg-red-500'
    reg_alert_msg.value = t('auth.form.register_error')
    return
  }

  reg_alert_variant.value = 'bg-green-500'
  reg_alert_msg.value = t('auth.form.register_success')
  /**
   * ! This will reload the page
   */
  window.location.reload()
}

</script>

<style></style>
