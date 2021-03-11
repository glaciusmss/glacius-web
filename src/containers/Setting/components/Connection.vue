<template>
  <div>
    <div class="flex flex-row text-sm mb-6">
      <span class="mr-3">Status:</span>
      <span :class="isConnectedLabelClass">
        {{ isConnectedLabel }}
      </span>
    </div>
    <div class="flex flex-row text-sm items-baseline">
      <span class="w-2/12 lg:w-1/12">Connection:</span>
      <div class="w-10/12 lg:w-11/12">
        <danger-button
          v-if="isConnected"
          @click="onButtonClick"
        >
          Disconnect
        </danger-button>

        <validation-observer
          v-else
          v-slot="{ handleSubmit }"
          ref="form"
          slim
        >
          <validation-provider
            v-slot="{ errors: [error], failed }"
            :vid="fieldKey"
            slim
          >
            <div class="flex flex-row items-start w-full">
              <div
                v-if="hasField"
                class="flex flex-col"
              >
                <input
                  v-model="field"
                  class="w-64 mr-4 block text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  :placeholder="fieldPlaceholder"
                  :class="{'border-red-500': failed}"
                  @keyup.enter="handleSubmit(onButtonClick)"
                >
                <span
                  v-if="failed"
                  class="text-red-500 text-xs italic"
                >
                  {{ error }}
                </span>
              </div>
              <primary-button
                :disabled="isSubmitting"
                :show-loader="isSubmitting"
                @click="handleSubmit(onButtonClick)"
              >
                Connect
              </primary-button>
            </div>
          </validation-provider>
        </validation-observer>
      </div>
    </div>

    <modal
      v-model="isDisconnectModalOpen"
      :title="disconnectModalTitle"
      :is-submitting="isDisconnectSubmitting"
      btn-confirm-danger
      @confirm-click="onDisconnect"
    >
      <div class="pl-0 p-6">
        You will be disconnect from {{ identifier }}
      </div>
    </modal>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { DangerButton, PrimaryButton, Modal } from '@/components';
import { mapGetters, mapActions } from 'vuex';
import { ErrorUtils, ServerUtils } from '@/mixins';
import { upperFirst } from 'lodash';

export default {
  components: {
    Modal,
    ValidationObserver,
    ValidationProvider,
    PrimaryButton,
    DangerButton,
  },
  mixins: [ServerUtils, ErrorUtils],
  props: {
    hasField: {
      type: Boolean,
      required: true,
    },
    fieldKey: {
      type: String,
      required: true,
    },
    fieldPlaceholder: {
      type: String,
      default: '',
    },
    identifier: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    field: '',
    isDisconnectModalOpen: false,
    isDisconnectSubmitting: false,
  }),
  computed: {
    ...mapGetters('setting', ['isMarketplaceConnected']),
    isConnected() {
      return this.isMarketplaceConnected(this.identifier);
    },
    isConnectedLabel() {
      return this.isConnected ? 'Connected' : 'Not connected';
    },
    isConnectedLabelClass() {
      return {
        'text-green-400': this.isConnected,
        'text-red-400': !this.isConnected,
      };
    },
    disconnectModalTitle() {
      return upperFirst(this.identifier);
    },
  },
  methods: {
    ...mapActions('setting', ['connect', 'disconnect']),
    async onButtonClick() {
      if (this.isConnected) {
        this.isDisconnectModalOpen = true;
      } else {
        await this.onConnect();
      }
    },
    async onConnect() {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;

      try {
        const { url } = await this.connect({
          identifier: this.identifier,
          data: {
            rtn_url: window.location.href,
            ...(this.hasField && { [this.fieldKey]: this.field }),
          },
        });

        // do redirect
        window.location.href = url;
      } catch (error) {
        this.handleError(error, this.fieldKey);
      } finally {
        this.isSubmitting = false;
      }
    },
    async onDisconnect() {
      if (this.isDisconnectSubmitting) {
        return;
      }

      this.isDisconnectSubmitting = true;

      try {
        await this.disconnect(this.identifier);
      } catch (error) {
        console.log(error);
      } finally {
        this.isDisconnectModalOpen = false;
        this.isDisconnectSubmitting = false;
      }
    },
  },
};
</script>
