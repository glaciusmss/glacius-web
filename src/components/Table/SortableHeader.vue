<template>
  <span>
    {{ label }}

    <!-- apply text-gray-300 to non-sort column header-->
    <font-awesome-icon
      :class="{'text-gray-300': isNotActiveField}"
      :icon="currentSortIcon"
      fixed-width
      aria-hidden="true"
    />
  </span>
</template>

<script>
import { isFunction } from 'lodash';

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    field: {
      type: [String, Function],
      required: true,
    },
    serverSortField: {
      type: String,
      required: true,
    },
    serverSortOrder: {
      type: String,
      required: true,
    },
  },
  computed: {
    isNotActiveField() {
      if (isFunction(this.field)) {
        return true;
      }

      return this.field !== this.serverSortField;
    },
    currentSortIcon() {
      if (isFunction(this.field) || this.field !== this.serverSortField) {
        return 'sort';
      }

      return this.serverSortOrder === 'asc' ? 'sort-up' : 'sort-down';
    },
  },
};
</script>
