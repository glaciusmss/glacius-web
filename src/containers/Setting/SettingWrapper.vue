<template>
  <div class="mt-6">
    <tabs
      v-model="selectedTab"
      :tab-list="tabList"
    />

    <router-view />
  </div>
</template>

<script>
import { Tabs } from '@/components';
import { mapActions } from 'vuex';

export const tabToUrlMap = {
  shop: 0,
  shopify: 1,
  easystore: 2,
  woocommerce: 3,
};

export default {
  components: {
    Tabs,
  },
  data: () => ({
    selectedTab: tabToUrlMap[window.location.pathname.split('/').pop()] ?? 0,
    tabList: [
      { name: 'Shop' },
      { name: 'Shopify' },
      { name: 'EasyStore' },
      { name: 'WooCommerce' },
    ],
  }),
  watch: {
    selectedTab(newValue) {
      switch (newValue) {
        case 0:
          this.$router.push(`/portal/${this.$route.params.shopId}/setting/${Object.keys(tabToUrlMap)[0]}`);
          break;
        case 1:
          this.$router.push(`/portal/${this.$route.params.shopId}/setting/${Object.keys(tabToUrlMap)[1]}`);
          break;
        case 2:
          this.$router.push(`/portal/${this.$route.params.shopId}/setting/${Object.keys(tabToUrlMap)[2]}`);
          break;
        case 3:
          this.$router.push(`/portal/${this.$route.params.shopId}/setting/${Object.keys(tabToUrlMap)[3]}`);
          break;
        default:
      }
    },
  },
  mounted() {
    this.loadConnectedMarketplaces();
    this.loadAllSettings();
  },
  methods: {
    ...mapActions('setting', ['loadConnectedMarketplaces', 'loadAllSettings']),
  },
};
</script>
