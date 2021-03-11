<template>
  <div :class="{'theme-dark': isDarkMode}">
    <router-view />

    <portal-target name="modal" />
  </div>
</template>

<script>
import { PortalTarget } from 'portal-vue';
import { mapState } from 'vuex';

export default {
  components: {
    PortalTarget,
  },

  computed: {
    ...mapState('layout', {
      isDarkMode: (state) => state.dark,
    }),
  },
};
</script>
