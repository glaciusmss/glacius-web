<template>
  <span class="flex items-center col-span-3">
    Showing {{ meta.from || 0 }} - {{ meta.to || 0 }} of {{ meta.total || 0 }}
  </span>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
};
</script>
