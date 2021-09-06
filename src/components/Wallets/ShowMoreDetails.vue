<template>
  <v-expansion-panels v-model="showMore" flat class="show-more-details">
    <v-expansion-panel class="show-more-details__panel">
      <v-expansion-panel-content class="show-more-details__content">
        <div class="show-more-details__entries">
          <transaction-details-entry
            v-for="(entry, index) in entries"
            :key="index"
            :value="getValue(entry.value)"
            :wallet="entry.wallet"
            can-copy
          />
        </div>
      </v-expansion-panel-content>

      <div class="show-more-details__bottom">
        <v-expansion-panel-header hide-actions class="show-more-details__header" expand-icon="mdi-chevron-down">
          <form-indent
            class="show-more-details__header-content"
            :text="isOpen ? 'Hide entries' : `Show ${entries.length} more entries`"
          />
        </v-expansion-panel-header>

        <swap-copy-wrapper>
          <template #default="{ copy, tooltipOn }">
            <button
              type="button"
              class="show-more-details__copy-button"
              v-on="tooltipOn"
              @click="copy(JSON.stringify(entries))"
            >
              <svg-icon class="show-more-details__copy-icon" name="copy" /> Copy
            </button>
          </template>
        </swap-copy-wrapper>
      </div>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import SwapCopyWrapper from '@/components/UI/SwapCopyWrapper.vue'
import FormIndent from '../UI/Forms/Indent.vue'
import TransactionDetailsEntry from './Transactions/TransactionDetailsEntry.vue'

export default {
  name: 'ShowMoreDetails',
  components: {
    FormIndent,
    TransactionDetailsEntry,
    SwapCopyWrapper
  },
  props: {
    entries: { type: Array, default: () => [] },
    currentDecimal: { type: Number, default: 1 },
    decimal: { type: Number, default: 1 },
    journal: { type: Array, default: () => [] }
  },
  data() {
    return {
      showMore: undefined
    }
  },
  computed: {
    isOpen() {
      return this.showMore !== undefined
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
  &__panel {
    background: transparent !important;
  }
  &__header {
    padding: 0;
    min-height: 0 !important;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-medium;
  }

  &__header-content {
    text-align: center;
    font-size: $--font-size-base;
    margin: 0 !important;
    background: var(--main-button-background);
    transition: background 0.3s;

    &:hover {
      background: var(--main-button-background-hover);
    }
  }

  &__content {
    > div {
      padding: 0 0;
    }
  }

  &__bottom {
    display: flex;
    flex-direction: row;
  }

  &__copy-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--main-button-background);
    border-radius: $--main-border-radius;
    height: auto;
    margin-left: 8px;
    padding: 9px;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small;
    transition: background 0.3s;

    &:hover {
      background: var(--main-button-background-hover);
    }
  }

  &__copy-icon {
    width: 11px;
    height: 11px;
    margin-right: 5px;
  }
}
</style>
