<template>
  <match-media v-slot="{ desktop }" tag="div">
    <div v-if="desktop" class="chart-date-filters">
      <button
        v-for="{ id, value, label } in options"
        :key="id"
        class="chart-date-filters__filter-button"
        :class="{ 'chart-date-filters__filter-button--active': dateRange === value }"
        @click="changeDateRange(value)"
      >
        {{ label }}
      </button>
    </div>
    <div v-else class="chart-date-select">
      <v-select
        :value="dateRange"
        height="27"
        item-text="label"
        item-value="value"
        class="chart-date-select__item"
        hide-details
        dense
        flat
        filled
        append-icon="mdi-chevron-down"
        :menu-props="{ 'content-class': 'chart-date-select__select-menu' }"
        :items="options"
        @input="changeDateRange"
      />
    </div>
  </match-media>
</template>

<script>
import { MatchMedia } from 'vue-component-media-queries'

export default {
  name: 'ChartDateFilters',
  components: {
    MatchMedia
  },
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

    &:hover {
      &:not(.chart-date-filters__filter-button--active) {
        background-color: get-theme-for($button, 'primary', 'hover');
      }
    }

    &--active {
      background-color: get-theme-for($background, 'primary');

      box-shadow: 0px 0px 15px rgba(17, 17, 17, 0.02);
      border: 0.5px solid rgba(0, 0, 0, 0.04);
    }
  }
}

.chart-date-select {
  &__item {
    border-radius: $--main-border-radius;
    color: get-theme-for($text, 'primary') !important;
    border: 1px solid get-theme-for($border-color, 'primary');
    max-width: 49px;

    &:focus-within {
      .v-input__icon .v-icon {
        color: get-theme-for($text, 'primary') !important;
      }
    }

    .v-input__icon {
      &--append {
        width: 9px;
        min-width: 9px;
        height: 4px;
      }

      .v-icon {
        font-size: 13px;
      }
    }

    .v-select__selections {
      min-width: unset;
      line-height: unset;
    }

    .v-select__selection {
      font-weight: $--font-weight-semi-bold;
      font-size: 14px;

      &--comma {
        max-width: 21px;
        margin-right: 0 !important;
      }
    }

    .v-input__append-inner {
      margin: 0 !important;
      margin-left: auto;
      padding-left: 0 !important;
      align-self: unset !important;
    }

    .v-input__slot {
      min-height: 28px !important;
      padding: 0 8px !important;
      background: get-theme-for($button, 'primary', 'enabled') !important;

      &:hover {
        background-color: get-theme-for($button, 'primary', 'hover') !important;
      }

      &:before,
      &:after {
        display: none;
      }
    }
  }

  &__select-menu {
    max-width: 49px;
    width: 49px;

    .v-list {
      background: get-theme-for($button, 'primary', 'enabled') !important;
      border-radius: $--main-border-radius;
      padding: 3px 0;
    }

    .v-list-item {
      min-height: 27px;
      text-align: center;
      padding: 0 4px;
      border-radius: $--main-border-radius;
      margin: 0 1px;

      &:hover {
        &:not(.v-list-item--active) {
          background-color: get-theme-for($button, 'primary', 'hover');
        }
      }

      &__title {
        font-weight: $--font-weight-semi-bold !important;
        font-size: 14px !important;
      }
    }

    .v-list-item--active {
      background: get-theme-for($background, 'primary');
      color: get-theme-for($text, 'primary') !important;
    }
  }
}
</style>
