<template>
  <div class="flex items-center h-screen bg-gray-100">
    <div class="w-full max-w-sm mx-auto">
      <div class="tracking-login-title text-2xl uppercase mt-5 mb-10 mx-0 text-center">
        glacius<strong>mss</strong>
      </div>
      <validation-observer
        v-slot="{ handleSubmit }"
        ref="form"
        tag="div"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <validation-provider
            v-slot="{ errors: [error], failed }"
            vid="email"
          >
            <input
              id="email"
              v-model="email"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
              :class="{'border-red-500': failed}"
              type="text"
              placeholder="Email"
            >
            <span
              v-if="failed"
              class="text-red-500 text-xs italic"
            >
              {{ error }}
            </span>
          </validation-provider>
        </div>

        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <validation-provider
            v-slot="{ errors: [error], failed }"
            vid="password"
          >
            <input
              id="password"
              v-model="password"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
              :class="{'border-red-500': failed}"
              type="password"
              placeholder="******************"
              @keyup.enter="handleSubmit(attemptLogin)"
            >
            <span
              v-if="failed"
              class="text-red-500 text-xs italic"
            >
              {{ error }}
            </span>
          </validation-provider>
        </div>

        <div class="flex items-center justify-between">
          <primary-button
            :disabled="isSubmitting"
            :show-loader="isSubmitting"
            @click="handleSubmit(attemptLogin)"
          >
            Sign In
          </primary-button>
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </validation-observer>

      <p class="text-center text-gray-500 text-xs">
        Copyright &copy; 2019 - 2020 • GlaciusMSS
      </p>
    </div>
  </div>
</template>

<script>
import { PrimaryButton } from '@/components';
import { ServerUtils, ErrorUtils } from '@/mixins';
import { mapActions } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  components: {
    PrimaryButton,
    ValidationObserver,
    ValidationProvider,
  },
  mixins: [ServerUtils, ErrorUtils],
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    ...mapActions('auth', [
      'login',
    ]),
    async attemptLogin() {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;

      try {
        await this.login({
          email: this.email,
          password: this.password,
        });

        if (this.$route.query?.rtn) {
          return await this.$router.replace(this.$route.query?.rtn);
        }

        return await this.$router.replace('/portal');
      } catch (error) {
        this.handleError(error, 'email');
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>
