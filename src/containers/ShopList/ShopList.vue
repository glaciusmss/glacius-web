<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col flex-1 w-full">
      <navbar
        show-logo
        :show-menu="false"
        :show-shop-list="false"
      />

      <main class="h-full overflow-y-auto bg-gray-100">
        <div class="container px-6 py-10 mx-auto grid">
          <h1 class="text-2xl font-semibold">
            Shop List
          </h1>
          <span class="mt-4 text-sm">Add or manage your shop easily.</span>

          <setup-shop />

          <div class="mt-4 w-full overflow-hidden">
            <vue-good-table
              :columns="columns"
              :rows="shopList"
              table-wrapper-style-class="w-full overflow-x-auto"
              style-class="w-full whitespace-no-wrap border-collapse border border-gray-200"
              thead-tr-style-class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              tbody-style-class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
              row-style-class="text-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              @on-row-click="selectShop"
            >
              <template slot="emptystate">
                <div class="px-4 py-3">
                  Start adding your shop today
                </div>
              </template>
            </vue-good-table>
          </div>
        </div>
      </main>

      <footer-bar />
    </div>
  </div>
</template>

<script>
import Navbar from '@/containers/Layout/Navbar.vue';
import FooterBar from '@/containers/Layout/FooterBar.vue';
import { VueGoodTable } from 'vue-good-table';
import { mapMutations, mapState } from 'vuex';
import { formatDatetimeToAgo } from '@/utils/helper';
import { SET_CURRENT_SHOP } from '@/store/modules/app';
import { RESET_STATE } from '@/store/modules/setting';
import SetupShop from './SetupShop.vue';

export default {
  components: {
    Navbar,
    FooterBar,
    SetupShop,
    VueGoodTable,
  },
  data: () => ({
    columns: [
      {
        label: 'Name',
        field: 'name',
        thClass: 'px-4 py-3',
        tdClass: 'px-4 py-3',
      },
      {
        label: 'Description',
        field: 'description',
        thClass: 'px-4 py-3',
        tdClass: 'px-4 py-3',
      },
      {
        label: 'Created On',
        field: 'created_at',
        thClass: 'px-4 py-3',
        tdClass: 'px-4 py-3',
        formatFn: formatDatetimeToAgo,
      },
    ],
  }),
  computed: {
    ...mapState('shop', {
      shopList: (state) => state.shopList,
    }),
  },
  mounted() {
    this[SET_CURRENT_SHOP](null);
    this[RESET_STATE]();
  },
  methods: {
    ...mapMutations('app', [SET_CURRENT_SHOP]),
    ...mapMutations('setting', [RESET_STATE]),
    selectShop({ row: { id } }) {
      this.$router.push(`/portal/${id}`);
    },
  },
};
</script>
