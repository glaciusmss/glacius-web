<template>
  <div>
    <div class="flex flex-row flex-wrap mt-10">
      <primary-button
        icon="plus"
        @click="showAddShopModal"
      >
        Add shop
      </primary-button>
    </div>

    <modal
      v-model="isOpenShopModalOpen"
      :show-footer="false"
    >
      <validation-observer
        v-slot="{ handleSubmit }"
        ref="form"
        tag="div"
      >
        <div class="flex flex-col text-center mt-4 mb-6">
          <span class="mb-10">Set Up Your Shop</span>

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

          <label class="block text-sm text-left">
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
        </div>

        <footer
          class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-2 sm:flex-row bg-gray-50 dark:bg-gray-800"
        >
          <secondary-button @click="isOpenShopModalOpen = false">
            Cancel
          </secondary-button>
          <primary-button
            :disabled="isSubmitting"
            :show-loader="isSubmitting"
            @click="handleSubmit(onConfirmClick)"
          >
            Continue
          </primary-button>
        </footer>
      </validation-observer>
    </modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import {
  PrimaryButton, SecondaryButton, Modal,
} from '@/components';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { ErrorUtils, ServerUtils } from '@/mixins';

export default {
  components: {
    PrimaryButton,
    SecondaryButton,
    Modal,
    ValidationObserver,
    ValidationProvider,
  },
  mixins: [ServerUtils, ErrorUtils],
  data: () => ({
    isOpenShopModalOpen: false,
    name: '',
    description: '',
  }),
  methods: {
    ...mapActions('shop', ['addShop']),
    showAddShopModal() {
      this.isOpenShopModalOpen = true;
    },
    async onConfirmClick() {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;

      try {
        await this.addShop({ name: this.name, description: this.description });

        this.reset();
      } catch (error) {
        this.handleError(error, 'description');
      } finally {
        this.isSubmitting = false;
      }
    },
    reset() {
      this.name = '';
      this.description = '';
      this.isOpenShopModalOpen = false;
    },
  },
};
</script>
