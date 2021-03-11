<template>
  <li class="flex">
    <button
      class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <font-awesome-icon
        v-if="icon"
        :icon="icon"
        fixed-width
        class="mr-4"
        aria-hidden="true"
      />
      <span>{{ name }}</span>
    </button>
  </li>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
