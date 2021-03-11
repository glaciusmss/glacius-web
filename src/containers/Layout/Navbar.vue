<template>
  <header class="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
    <div class="flex items-center justify-end h-full px-6 text-purple-600 dark:text-purple-300">
      <logo
        v-if="showLogo"
        link="/portal"
      />

      <!-- Mobile hamburger -->
      <button
        v-if="showMenu"
        class="p-1 mr-6 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
        aria-label="Menu"
        @click="toggleSideMenu"
      >
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Shop list button -->
      <router-link
        v-if="showShopList"
        class="p-1 mr-auto -ml-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        to="/portal/shop/list"
      >
        Shop List
      </router-link>

      <ul class="flex items-center flex-shrink-0 space-x-6">
        <!-- Theme toggler -->
        <li class="flex">
          <button
            class="rounded-md focus:outline-none focus:shadow-outline-purple"
            aria-label="Toggle color mode"
            @click="toggleTheme"
          >
            <template v-if="!dark">
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                />
              </svg>
            </template>
            <template v-if="dark">
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
          </button>
        </li>
        <profile-dropdown />
      </ul>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { UPDATE_SIDE_MENU, UPDATE_DARK } from '@/store/modules/layout';
import ProfileDropdown from './ProfileDropdown.vue';
import Logo from './components/Logo.vue';

export default {
  components: {
    ProfileDropdown,
    Logo,
  },
  props: {
    showLogo: {
      type: Boolean,
      default: false,
    },
    showMenu: {
      type: Boolean,
      default: true,
    },
    showShopList: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState('layout', {
      dark: (state) => state.dark,
      isSideMenuOpen: (state) => state.isSideMenuOpen,
    }),
  },
  methods: {
    ...mapMutations('layout', [
      UPDATE_DARK,
      UPDATE_SIDE_MENU,
    ]),
    toggleTheme() {
      this[UPDATE_DARK](!this.dark);
    },
    toggleSideMenu() {
      this[UPDATE_SIDE_MENU](!this.isSideMenuOpen);
    },
  },
};
</script>
