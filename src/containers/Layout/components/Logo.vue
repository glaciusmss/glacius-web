<template>
  <router-link
    class="mr-auto text-lg font-bold text-gray-800 dark:text-gray-200"
    :class="$data.staticClass || ''"
    :to="link"
  >
    Glacius MSS
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true,
    },
  },
};
</script>
