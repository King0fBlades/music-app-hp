<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <VeeForm :validation-schema="schema" @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.name') }}</label>
      <VeeField
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.email') }}</label>
      <VeeField
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.age') }}</label>
      <VeeField
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.password') }}</label>
      <VeeField name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </VeeField>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.confirm_password') }}</label>
      <VeeField
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.country.country') }}</label>
      <VeeField
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">{{ $t('register.country.usa') }}</option>
        <option value="Mexico">{{ $t('register.country.mexico') }}</option>
        <option value="Germany">{{ $t('register.country.germany') }}</option>
        <option value="UK">{{ $t('register.country.uk') }}</option>
        <option value="Antarctica">{{ $t('register.country.antarctica') }}</option>
      </VeeField>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- Role -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.role.role') }}</label>
      <VeeField
        as="select"
        name="role"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="Listener">{{ $t('register.role.listener') }}</option>
        <option value="Artist">{{ $t('register.role.artist') }}</option>
      </VeeField>
      <ErrorMessage class="text-red-600" name="role" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <VeeField
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded inline-block"
      />
      <i18n-t class="inline-block" keypath="register.accept" tag="label">
        <a href="#">{{ $t('register.tos') }}</a>
      </i18n-t>
      <ErrorMessage class="text-red-600" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700 cursor-pointer"
      :disabled="reg_in_submission"
    >
      {{ $t('register.submit') }}
    </button>
  </VeeForm>
</template>

<script>
import { ErrorMessage } from 'vee-validate'
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'

export default {
  name: 'RegisterForm',
  data() {
    return {
      tab: 'login',
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:9|max:100|excluded:password',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Antarctica',
        tos: 'tos',
        role: 'required'
      },
      userData: {
        country: 'USA',
        role: 'Listener'
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created.'
    }
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: 'register'
    }),

    async register(values) {
      this.reg_show_alert = true
      this.reg_in_submission = true
      this.reg_alert_variant = 'bg-blue-500'
      this.reg_alert_msg = 'Please wait! Your account is being created.'

      try {
        await this.createUser(values)
      } catch (error) {
        this.reg_in_submission = false
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = 'An unexpected error occurred. Please try again later.'
        return
      }

      this.reg_alert_variant = 'bg-green-500'
      this.reg_alert_msg = 'Success! Your account has been created.'
      window.location.reload()
    }
  },
  components: { ErrorMessage }
}
</script>
