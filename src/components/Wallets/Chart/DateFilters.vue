<template>
  <div class="chart-date-filters">
    <button
      v-for="(label, range) in options"
      :key="range"
      class="chart-date-filters__filter-button"
      :class="{ 'chart-date-filters__filter-button--active': dateRange === range }"
      @click="changeDateRange(range)"
    >
      {{ label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ChartDateFilters',
  props: {
    dateRange: { type: String, default: '' },
    options: { type: [Array, Object], default: () => [] }
  },
  methods: {
    changeDateRange(dateRange) {
      this.$emit('change', dateRange)
    }
  }
}
</script>

<style lang="scss">
.chart-date-filters {
  background-color: get-theme-for($button, 'primary', 'enabled');
  border-radius: $--main-border-radius;
  height: fit-content;
  padding: 1px;

  &__filter-button {
    border-radius: $--main-border-radius;
    border: 0.5px solid transparent;
    line-height: 18px;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-base;
    color: get-theme-for($text, 'primary');
    padding: 4px 8px;

    &--active {
      background: get-theme-for($background, 'primary');

      box-shadow: 0px 0px 15px rgba(17, 17, 17, 0.02);
      border: 0.5px solid rgba(0, 0, 0, 0.04);
    }
  }
}
</style>
