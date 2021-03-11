<template>
  <div class="flex items-center col-span-3">
    <span class="mr-2">Show</span>
    <select
      :value="value"
      class="text-sm cursor-pointer dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
      @input="$emit('change', $event.target.value)"
    >
      <option
        v-for="pageSize in pageSizeList"
        :key="pageSize"
      >
        {{ pageSize }}
      </option>
    </select>
    <span class="ml-2">entries</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    pageSizeList: {
      type: Array,
      required: true,
    },
  },
};
</script>
