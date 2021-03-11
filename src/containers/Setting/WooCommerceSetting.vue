<template>
  <div class="bg-white p-6 rounded-b w-full">
    <connection
      has-field
      field-key="woocommerce_store_url"
      field-placeholder="Woocommerce store url"
      identifier="woocommerce"
    />

    <template v-if="isConnected">
      <div class="mt-12 font-semibold text-lg">
        Sync Setting
      </div>
      <hr class="mt-2">

      <div class="mt-4">
        <dynamic-form
          v-for="setting in getSettings('sync')"
          :key="setting.setting_key"
          :setting="setting"
          @change="updateForm(setting.setting_key, $event, 'sync')"
        />
      </div>

      <primary-button
        :show-loader="isSubmitting"
        :disabled="isSubmitting"
        @click="onSaveClick"
      >
        Save
      </primary-button>
    </template>
  </div>
</template>

<script>
import { PrimaryButton } from '@/components';
import Connection from './components/Connection.vue';
import SettingMixin from './mixins/setting_mixin';
import DynamicForm from './components/DynamicForm.vue';

export default {
  components: {
    PrimaryButton,
    Connection,
    DynamicForm,
  },
  mixins: [SettingMixin],
  data: () => ({
    identifier: 'woocommerce',
  }),
};
</script>
