<template>
  <div
    class="flex h-screen bg-gray-50 dark:bg-gray-900"
  >
    <template v-if="!isValidShopId" />
    <template v-else>
      <desktop-sidebar />
      <mobile-sidebar />
      <div class="flex flex-col flex-1 w-full">
        <navbar />

        <main class="h-full overflow-y-auto bg-gray-100">
          <div class="container px-6 mx-auto grid">
            <router-view />
          </div>
        </main>

        <footer-bar />
      </div>
    </template>
  </div>
</template>

<script>
import { SET_CURRENT_SHOP } from '@/store/modules/app';
import Navbar from './Navbar.vue';
import MobileSidebar from './MobileSidebar.vue';
import DesktopSidebar from './DesktopSidebar.vue';
import FooterBar from './FooterBar.vue';

export default {
  components: {
    Navbar,
    MobileSidebar,
    DesktopSidebar,
    FooterBar,
  },
  data: () => ({
    isValidShopId: false,
  }),
  mounted() {
    const { shopId } = this.$route.params;

    if (!this.$store.getters['shop/isShopExist'](shopId)) {
      return this.$router.push('/portal/shop/list');
    }

    // store the shop info to app
    this.$store.commit(`app/${SET_CURRENT_SHOP}`, this.$store.getters['shop/findShop'](shopId));

    this.isValidShopId = true;
  },
};
</script>
