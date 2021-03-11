<template>
  <div>
    <transition
      enter-active-class="transition ease-in-out duration-150"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in-out duration-150"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isSideMenuOpen"
        class="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
      />
    </transition>
    <transition
      enter-active-class="transition ease-in-out duration-150"
      enter-class="opacity-0 transform -translate-x-20"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in-out duration-150"
      leave-class="opacity-100"
      leave-to-class="opacity-0 transform -translate-x-20"
    >
      <div
        v-if="isSideMenuOpen"
        class="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden"
        @keydown.escape="closeSideMenu"
      >
        <sidebar-content />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { UPDATE_SIDE_MENU } from '@/store/modules/layout';
import SidebarContent from './components/SidebarContent.vue';

export default {
  components: {
    SidebarContent,
  },
  computed: {
    ...mapState('layout', {
      isSideMenuOpen: (state) => state.isSideMenuOpen,
    }),
  },
  methods: {
    ...mapMutations('layout', [
      UPDATE_SIDE_MENU,
    ]),
    closeSideMenu() {
      this[UPDATE_SIDE_MENU](false);
    },
  },
};
</script>
