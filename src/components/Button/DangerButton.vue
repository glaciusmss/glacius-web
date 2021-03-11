<template>
  <button
    class="disabled:opacity-50 disabled:cursor-not-allowed w-full sm:px-4 sm:py-2 sm:w-auto items-center justify-between px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-500 border border-transparent rounded-lg active:bg-red-500 hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
    :class="[$data.staticClass || '', {'inline-flex': showLoader}]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <font-awesome-icon
      v-if="icon && !showLoader"
      :icon="icon"
      fixed-width
      class="w-4 mr-2 -ml-1"
      aria-hidden="true"
    />
    <spinner v-if="showLoader" />
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
    showLoader: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
