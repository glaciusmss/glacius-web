<template>
  <router-link
    v-slot="{ href, navigate, isActive }"
    :to="route"
  >
    <li class="relative px-6 py-3">
      <span
        v-if="isActive"
        class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
        aria-hidden="true"
      />
      <a
        class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
        :class="{'text-gray-800': isActive, 'dark:text-gray-100': isActive}"
        :href="href"
        @click="navigate"
      >
        <font-awesome-icon
          :icon="icon"
          fixed-width
          class="mr-4"
          aria-hidden="true"
        />
        <span>{{ name }}</span>
      </a>
    </li>
  </router-link>
</template>

<script>
export default {
  props: {
    route: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
