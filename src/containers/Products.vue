<template>
  <div class="mt-6 px-4 py-3 bg-white rounded-lg shadow-md w-full overflow-hidden dark:bg-gray-800">
    <vue-good-table
      mode="remote"
      :columns="columns"
      :rows="productData"
      :total-rows="totalRows"
      table-wrapper-style-class="w-full overflow-x-auto"
      style-class="w-full whitespace-no-wrap border-collapse border border-gray-200"
      thead-tr-style-class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
      tbody-style-class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
      row-style-class="text-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
      :pagination-options="{enabled: true, position: 'both'}"
      @on-sort-change="onSortChange"
      @on-page-change="onPageChange"
      @on-per-page-change="onPerPageChange"
    >
      <template slot="emptystate">
        <div class="px-4 py-3">
          No Product Found
        </div>
      </template>

      <template
        slot="table-column"
        slot-scope="props"
      >
        <sortable-header
          :field="props.column.field"
          :label="props.column.label"
          :server-sort-field="serverParams.sort_field"
          :server-sort-order="serverParams.sort_order"
        />
      </template>

      <template
        slot="pagination-top"
        slot-scope="props"
      >
        <table-top
          :per-page-changed="props.perPageChanged"
          :meta="meta"
          @search="onSearch"
        />
      </template>

      <template
        slot="pagination-bottom"
        slot-scope="props"
      >
        <pagination
          :page-changed="props.pageChanged"
          :meta="meta"
        />
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table';
import { TableUtils } from '@/mixins';
import request from '@/utils/request';
import { Pagination, TableTop, SortableHeader } from '@/components';
import { formatDatetimeToFromNow } from '@/utils/helper';

export default {
  components: {
    TableTop,
    Pagination,
    SortableHeader,
    VueGoodTable,
  },
  mixins: [TableUtils],
  data: () => ({
    columns: [
      {
        label: 'ID',
        field: 'id',
        thClass: 'px-4 py-3 cursor-pointer',
        tdClass: 'px-4 py-3',
      },
      {
        label: 'Name',
        field: 'name',
        thClass: 'px-4 py-3 cursor-pointer',
        tdClass: 'px-4 py-3',
      },
      {
        label: 'Price',
        field: (product) => product.product_variants[0].price,
        thClass: 'px-4 py-3 cursor-pointer',
        tdClass: 'px-4 py-3',
      },
      {
        label: 'Last Updated',
        field: 'updated_at',
        thClass: 'px-4 py-3 cursor-pointer',
        tdClass: 'px-4 py-3',
        formatFn: formatDatetimeToFromNow,
      },
    ],
    productData: [],
  }),
  methods: {
    async loadTableData() {
      const { data } = await request({
        url: '/product',
        method: 'GET',
        params: this.serverParams,
      });

      this.productData = data.data;
      this.meta = data.meta;
    },
  },
};
</script>
