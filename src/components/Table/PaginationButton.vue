<template>
  <li>
    <button
      class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
      :class="{'text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600': link.active}"
      @click="(link.url !== null && !link.active) ? $emit('click', link) : () => {}"
    >
      <span v-if="link.label === 'Previous'">
        <font-awesome-icon
          icon="chevron-left"
          fixed-width
          aria-hidden="true"
        />
      </span>
      <span v-else-if="link.label === 'Next'">
        <font-awesome-icon
          icon="chevron-right"
          fixed-width
          aria-hidden="true"
        />
      </span>
      <span v-else>
        {{ link.label }}
      </span>
    </button>
  </li>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
};
</script>
