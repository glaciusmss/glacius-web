<template>
  <ul
    class="list-reset flex"
    :class="{'flex-col w-48': isVertical}"
  >
    <li
      v-for="({ name }, index) in tabList"
      :key="index"
      class="-mb-px mr-2"
      :class="{'w-full': isVertical}"
    >
      <button
        :class="tabStyle(index)"
        @click="updateSelectedTab(index)"
      >
        {{ name }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    direction: {
      type: String,
      validator: (value) => ['horizontal', 'vertical'].indexOf(value) !== -1,
      default: 'horizontal',
    },
    tabList: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    currentSelectedTab: 0,
  }),
  computed: {
    isHorizontal() {
      return this.direction === 'horizontal';
    },
    isVertical() {
      return this.direction === 'vertical';
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.currentSelectedTab = newValue;
      },
    },
  },
  methods: {
    tabStyle(index) {
      let classes = '';

      if (this.isHorizontal) {
        classes += 'rounded-t';
      }

      if (this.isVertical) {
        classes += 'w-full rounded-l';
      }

      if (this.currentSelectedTab === index) {
        return `${classes} h-full text-left py-2 px-4 bg-white inline-block font-semibold`;
      }

      if (this.tabList[index].isDisabled) {
        return `${classes} h-full text-left py-2 px-4 cursor-not-allowed text-gray-300 inline-block`;
      }

      return `${classes} h-full text-left py-2 px-4 text-gray-500 hover:text-gray-800 hover:bg-white inline-block1`;
    },
    updateSelectedTab(index) {
      if (this.tabList[index].isDisabled) {
        return;
      }

      this.currentSelectedTab = index;
      this.$emit('input', index);
    },
  },
};
</script>
