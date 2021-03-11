<template>
  <div class="bg-white p-6 rounded-b w-full">
    <connection
      has-field
      field-key="shopify_shop"
      field-placeholder="Shopify shop name"
      :identifier="identifier"
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
import SettingMixin from './mixins/setting_mixin';
import Connection from './components/Connection.vue';
import DynamicForm from './components/DynamicForm.vue';

export default {
  components: {
    PrimaryButton,
    Connection,
    DynamicForm,
  },
  mixins: [SettingMixin],
  data: () => ({
    identifier: 'shopify',
  }),
};
</script>
