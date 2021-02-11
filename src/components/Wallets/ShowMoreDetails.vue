<template>
  <v-expansion-panels class="show-more-details">
    <v-expansion-panel class="show-more-details__inner">
      <v-expansion-panel-header class="show-more-details__header" expand-icon="mdi-chevron-down">
        Show entries
      </v-expansion-panel-header>
      <v-expansion-panel-content class="show-more-details__content">
        <div class="show-more-details__entries">
          <div v-for="(entry, index) in entries" :key="index" class="show-more-details__entry">
            <form-indent title="Wallet:" :text="entry.wallet"></form-indent>
            <form-indent title="Value:" :text="getValue(entry.value) + ' BTC'"></form-indent>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import FormIndent from '../FormIndent.vue'

export default {
  name: 'ShowMoreDetails',
  components: {
    FormIndent
  },
  props: {
    entries: {
      type: Array,
      default: () => []
    },
    currentDecimal: {
      type: Number,
      default: 1
    },
    decimal: {
      type: Number,
      default: 1
    }
  },
  methods: {
    getValue(value) {
      return (value * 10 ** (this.decimal * -1)).toFixed(this.currentDecimal)
    }
  }
}
</script>

<style lang="scss">
.show-more-details {
  margin-bottom: 25px;
  &__inner {
    &::before {
      display: none;
    }
  }
  &__header {
    padding: 0 0;
    min-height: 0 !important;
    color: $--purple;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-medium;
    border: none;
    .v-icon {
      color: $--purple !important;
    }
  }
  &__content {
    > div {
      padding: 0 0;
      padding-top: 15px;
    }
  }
  &__entries {
    border-radius: 12px;
    padding: 6px 20px;
    background: #f6f6f6;
  }
  &__entry {
    position: relative;
    padding: 8px 0;
    &:not(:first-child) {
      &::before {
        position: absolute;
        top: 0;
        width: 100%;
        height: 1px;
        content: '';
        display: block;
        background: rgba($--black, 0.12);
      }
    }
    > p {
      margin: 0 0;
      &:first-of-type {
        margin-bottom: 8px;
      }
    }
  }
}
</style>
