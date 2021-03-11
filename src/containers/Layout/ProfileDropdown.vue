<template>
  <li class="relative">
    <button
      class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
      aria-label="Account"
      aria-haspopup="true"
      @click="toggleDropdown"
      @keydown.escape="closeDropdown"
    >
      <img
        class="object-cover w-8 h-8 rounded-full"
        src="../../assets/images/avatar.png"
        alt="avatar"
        aria-hidden="true"
      >
    </button>
    <template v-if="isOpen">
      <ul
        class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
        aria-label="submenu"
      >
        <profile-dropdown-item
          name="My Account"
          icon="user"
        />
        <profile-dropdown-item
          name="Logout"
          icon="sign-out-alt"
          @click="showLogoutModal"
        />
      </ul>
    </template>

    <modal
      v-model="isLogoutModalOpen"
      title="Logout"
      btn-confirm-text="Logout"
      btn-confirm-danger
      @confirm-click="attemptLogout"
    >
      <div class="p-6 pl-0">
        You will be returned to the login screen.
      </div>
    </modal>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
import { Modal } from '@/components';
import ProfileDropdownItem from './components/ProfileDropdownItem.vue';

export default {
  components: {
    Modal,
    ProfileDropdownItem,
  },
  data: () => ({
    isOpen: false,
    isLogoutModalOpen: false,
  }),
  watch: {
    isOpen(newValue) {
      if (newValue) {
        window.addEventListener('click', this.outsideClickHandler);
      } else {
        window.removeEventListener('click', this.outsideClickHandler);
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('click', this.outsideClickHandler);
  },
  methods: {
    ...mapActions('auth', [
      'logout',
    ]),
    showLogoutModal() {
      this.isLogoutModalOpen = true;
    },
    async attemptLogout() {
      this.logout();
      await this.$router.replace('/login');
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown() {
      this.isOpen = false;
    },
    outsideClickHandler(e) {
      if (!this.$el.contains(e.target)) {
        this.toggleDropdown();
      }
    },
  },
};
</script>
