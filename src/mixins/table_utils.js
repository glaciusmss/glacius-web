export default {
  data: () => ({
    meta: {},
    serverParams: {
      shop_id: '',
      search: '',
      sort_field: 'id',
      sort_order: 'desc',
      page: 1,
      per_page: 10,
    },
  }),
  computed: {
    totalRows() {
      return this.meta?.total ?? 0;
    },
  },
  mounted() {
    this.serverParams.shop_id = this.$route.params.shopId;
    this.loadTableData();
  },
  methods: {
    currentSortIcon(field) {
      if (field === this.serverParams.sort_field) {
        return this.serverParams.sort_order === 'asc' ? 'sort-up' : 'sort-down';
      }

      return 'sort';
    },
    async onSortChange(params) {
      this.serverParams.sort_field = params[0].field;
      this.serverParams.sort_order = params[0].type;
      await this.loadTableData();
    },
    async onPageChange(params) {
      this.serverParams.page = params.currentPage;
      await this.loadTableData();
    },
    async onPerPageChange(params) {
      this.serverParams.per_page = params.currentPerPage;
      await this.loadTableData();
    },
    async onSearch(keyword) {
      this.serverParams.search = keyword;
      await this.loadTableData();
    },
    async loadTableData() {
      return Promise.reject(new Error('please override this method'));
    },
  },
};
