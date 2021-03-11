<template>
  <div class="grid py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase sm:grid-cols-9">
    <per-page
      :page-size-list="perPageList"
      :value="currentPerPage"
      @change="onPerPageChange"
    />

    <span class="col-span-3" />

    <table-search @search="onSearch($event)" />
  </div>
</template>

<script>
import { debounce } from 'lodash';
import PerPage from './PerPage.vue';
import TableSearch from './TableSearch.vue';

export default {
  components: {
    PerPage,
    TableSearch,
  },
  props: {
    meta: {
      type: Object,
      required: true,
    },
    perPageList: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
    perPageChanged: {
      type: Function,
      required: true,
    },
  },
  computed: {
    currentPerPage() {
      return this.meta?.per_page ?? this.perPageList[0];
    },
  },
  methods: {
    onPerPageChange(selectedPerPage) {
      this.perPageChanged({ currentPerPage: selectedPerPage });
    },
    onSearch: debounce(function onSearch(searchKeywords) {
      this.$emit('search', searchKeywords);
    }, 250),
  },
};
</script>
