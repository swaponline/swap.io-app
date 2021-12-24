<template>
  <div class="chart-date-filters">
    <button
      v-for="(label, range) in $options.TIME_PERIOD_CHART"
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
import { TIME_PERIOD_CHART, ONE_DAY_TYPE } from '@/constants/chartDateRange'

export default {
  TIME_PERIOD_CHART,
  name: 'ChartDateFilters',
  props: {
    dateRange: { type: String, default: ONE_DAY_TYPE }
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
    font-weight: 600;
    font-size: 14px;
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
