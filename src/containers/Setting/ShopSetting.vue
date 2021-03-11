<template>
  <div class="bg-white p-6 rounded-b">
    <validation-observer
      v-slot="{ handleSubmit }"
      ref="form"
      tag="div"
    >
      <label class="block text-sm text-left mb-6">
        <span class="text-gray-700 dark:text-gray-400">Shop name</span>
        <validation-provider
          v-slot="{ errors: [error], failed }"
          vid="name"
        >
          <input
            v-model="name"
            class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            :class="{'border-red-500': failed}"
          >
          <span
            v-if="failed"
            class="text-red-500 text-xs italic"
          >
            {{ error }}
          </span>
        </validation-provider>
      </label>

      <label class="block text-sm text-left mb-6">
        <span class="text-gray-700 dark:text-gray-400">Shop description</span>
        <validation-provider
          v-slot="{ errors: [error], failed }"
          vid="description"
        >
          <textarea
            v-model="description"
            class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
            :class="{'border-red-500': failed}"
          />
          <span
            v-if="failed"
            class="text-red-500 text-xs italic"
          >
            {{ error }}
          </span>
        </validation-provider>
      </label>

      <div class="flex flex-row items-start">
        <primary-button
          class="mr-auto"
          :disabled="isSubmitting"
          :show-loader="isSubmitting"
          @click="handleSubmit(onSaveClick)"
        >
          Save
        </primary-button>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { mapState, mapActions } from 'vuex';
import { PrimaryButton } from '@/components';
import { ErrorUtils, ServerUtils } from '@/mixins';

export default {
  components: {
    PrimaryButton,
    ValidationObserver,
    ValidationProvider,
  },
  mixins: [ServerUtils, ErrorUtils],
  data: () => ({
    id: '',
    name: '',
    description: '',
  }),
  computed: {
    ...mapState('app', {
      currentShop: (state) => state.currentShop,
    }),
  },
  mounted() {
    const { id, name, description } = this.currentShop;
    this.id = id;
    this.name = name;
    this.description = description;
  },
  methods: {
    ...mapActions('shop', ['updateShop']),
    async onSaveClick() {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;

      try {
        await this.updateShop({ id: this.id, name: this.name, description: this.description });
      } catch (error) {
        this.handleError(error, 'description');
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>
