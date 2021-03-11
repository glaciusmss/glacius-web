<template>
  <div class="mb-6">
    <div v-if="setting.type === 'boolean'">
      <label class="flex flex-row items-center">
        <input
          type="checkbox"
          class="h-4 w-4 form-checkbox cursor-pointer"
          :checked="setting.setting_value"
          @change="$emit('change', $event.target.checked)"
        >
        <span class="ml-3 text-sm select-none cursor-pointer">{{ setting.label }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    setting: {
      type: Object,
      required: true,
    },
  },
};
</script>
