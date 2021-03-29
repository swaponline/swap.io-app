<template>
  <v-expansion-panels v-model="showMore" class="show-more-details">
    <v-expansion-panel class="show-more-details__inner">
      <v-expansion-panel-header class="show-more-details__header" expand-icon="mdi-chevron-down">
        <span class="show-more-details__header-content">
          <span>Show entries</span>
          <span v-if="journal.length > 0" class="show-more-details__categories">
            <span
              v-for="category in categories"
              :key="category"
              class="show-more-details__category"
              :class="{ 'show-more-details__category--select': selectCategory === category }"
              @click="select($event, category)"
              >{{ category }}</span
            >
          </span>
        </span>
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
import FormIndent from '../UI/Forms/Indent.vue'

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
    },
    journal: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showMore: undefined,
      selectCategory: 'ALL',
      categories: ['ALL', 'BTC', 'ETH']
    }
  },
  methods: {
    getValue(value) {
      return (value * 10 ** (this.decimal * -1)).toFixed(this.currentDecimal)
    },
    select(e, category) {
      if (this.showMore !== undefined) {
        e.stopPropagation()
      }
      this.selectCategory = category
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
    &:focus::before {
      opacity: 0 !important;
    }
    .v-icon {
      color: $--purple !important;
    }
  }
  &__header-content {
    display: flex;
    align-items: center;
  }
  &__categories {
    display: inline-flex;
    margin: 0 5px;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-base;
    line-height: 19px;
  }
  &__category {
    margin: 0 5px;
    padding: 2px 8px;
    display: flex;
    align-items: center;
    background: $--light-grey;
    color: $--dark-grey;
    &--select {
      color: $--purple;
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
