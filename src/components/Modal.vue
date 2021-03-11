<template>
  <portal
    v-if="isOpen"
    to="modal"
  >
    <transition
      enter-active-class="transition ease-out duration-150"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
        @click="outsideClick"
      >
        <!-- Modal -->
        <transition
          enter-active-class="transition ease-out duration-150"
          enter-class="opacity-0 transform translate-y-1/2"
          enter-to-class="opacity-100"
          leave-active-class="transition ease-in duration-150"
          leave-class="opacity-100"
          leave-to-class="opacity-0  transform translate-y-1/2"
        >
          <div
            v-if="isOpen"
            id="modal"
            ref="modal"
            class="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
            role="dialog"
            @keydown.escape="closeModal"
          >
            <header class="flex justify-end">
              <span
                v-if="title"
                class="mr-auto font-semibold text-lg"
              >
                {{ title }}
              </span>

              <button
                class="disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
                aria-label="close"
                :disabled="isSubmitting === true"
                @click="closeModal"
              >
                <font-awesome-icon
                  icon="times"
                  fixed-width
                  aria-hidden="true"
                />
              </button>
            </header>
            <!-- Modal body -->
            <slot />
            <footer
              v-if="showFooter"
              class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-2 sm:flex-row bg-gray-50 dark:bg-gray-800"
            >
              <slot name="footer" />
              <template v-if="!hasFooterSlot">
                <secondary-button
                  v-if="showBtnCancel"
                  :icon="btnCancelIcon"
                  :disabled="isSubmitting === true"
                  @click="cancelClick"
                >
                  {{ btnCancelText }}
                </secondary-button>
                <primary-button
                  v-if="showBtnConfirm && !btnConfirmDanger"
                  :icon="btnConfirmIcon"
                  :disabled="isSubmitting === true"
                  :show-loader="isSubmitting === true"
                  @click="confirmClick"
                >
                  {{ btnConfirmText }}
                </primary-button>
                <danger-button
                  v-if="showBtnConfirm && btnConfirmDanger"
                  :icon="btnConfirmIcon"
                  :disabled="isSubmitting === true"
                  :show-loader="isSubmitting === true"
                  @click="confirmClick"
                >
                  {{ btnConfirmText }}
                </danger-button>
              </template>
            </footer>
          </div>
        </transition>
      </div>
    </transition>
  </portal>
</template>

<script>
import { Portal } from 'portal-vue';
import PrimaryButton from './Button/PrimaryButton.vue';
import SecondaryButton from './Button/SecondaryButton.vue';
import DangerButton from './Button/DangerButton.vue';

export default {
  components: {
    Portal,
    PrimaryButton,
    SecondaryButton,
    DangerButton,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    showBtnCancel: {
      type: Boolean,
      default: true,
    },
    showBtnConfirm: {
      type: Boolean,
      default: true,
    },
    closeModalOnCancelClick: {
      type: Boolean,
      default: true,
    },
    closeModalOnOutsideClick: {
      type: Boolean,
      default: true,
    },
    btnCancelIcon: {
      type: String,
      default: null,
    },
    btnConfirmIcon: {
      type: String,
      default: null,
    },
    btnConfirmDanger: {
      type: Boolean,
      default: false,
    },
    btnCancelText: {
      type: String,
      default: 'Cancel',
    },
    btnConfirmText: {
      type: String,
      default: 'Confirm',
    },
    title: {
      type: String,
      default: null,
    },
    isSubmitting: {
      type: Boolean,
      default: null,
    },
  },
  data: () => ({
    isOpen: false,
  }),
  computed: {
    hasFooterSlot() {
      return this.$slots.footer;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.isOpen = newValue;
      },
    },
  },
  methods: {
    closeModal() {
      if (this.isSubmitting) {
        return;
      }

      this.isOpen = false;
      this.$emit('input', false);
    },
    cancelClick() {
      if (this.closeModalOnCancelClick) {
        this.closeModal();
      }

      this.$emit('cancel-click');
    },
    confirmClick() {
      this.$emit('confirm-click');
    },
    outsideClick(event) {
      if (this.isSubmitting || !this.$refs.modal || this.$refs.modal.contains(event.target)) {
        // only trigger when outside click
        return;
      }

      if (this.closeModalOnOutsideClick) {
        this.closeModal();
      }

      this.$emit('outside-click');
    },
  },
};
</script>
