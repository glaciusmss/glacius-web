<template>
  <div class="grid py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase sm:grid-cols-9 dark:text-gray-400">
    <page-label :meta="meta" />
    <span class="col-span-2" />

    <!-- Pagination -->
    <div class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
      <nav aria-label="Table navigation">
        <ul class="inline-flex items-center">
          <pagination-button
            v-for="link in meta.links"
            :key="link.label"
            :link="link"
            @click="onPageChanged"
          />
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import PaginationButton from './PaginationButton.vue';
import PageLabel from './PageLabel.vue';

export default {
  components: {
    PaginationButton,
    PageLabel,
  },
  props: {
    pageChanged: {
      type: Function,
      required: true,
    },
    meta: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onPageChanged({ label }) {
      let currentPage = label;

      if (label === 'Previous') {
        currentPage = this.meta.current_page - 1;
      } else if (label === 'Next') {
        currentPage = this.meta.current_page + 1;
      }

      this.pageChanged({ currentPage });
    },
  },
};
</script>
