<template>
  <button
    class="disabled:opacity-50 disabled:cursor-not-allowed w-full sm:px-4 sm:py-2 sm:w-auto items-center justify-between px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
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
