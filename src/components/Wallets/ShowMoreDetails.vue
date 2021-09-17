<template>
  <v-expansion-panels flat class="show-more-details">
    <v-expansion-panel>
      <v-expansion-panel-content class="show-more-details__content">
        <transaction-details-entry
          v-for="(entry, index) in entries"
          :key="`transaction-entry-other-${index}`"
          v-bind="entry"
          can-copy
        />
      </v-expansion-panel-content>

      <div class="show-more-details__bottom">
        <v-expansion-panel-header #default="{ open }" hide-actions class="show-more-details__header">
          <div class="show-more-details__header-content">
            <swap-button small class="show-more-details__button">
              {{ open ? 'Hide entries' : `Show ${entries.length} more entries` }}
            </swap-button>
            <slot name="actions" />
          </div>
        </v-expansion-panel-header>
      </div>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import TransactionDetailsEntry from '@/components/Wallets/Transactions/TransactionDetailsEntry.vue'

export default {
  name: 'ShowMoreDetails',
  components: { TransactionDetailsEntry },
  props: {
    entries: { type: Array, default: () => [] }
  }
}
</script>

<style lang="scss">
.show-more-details {
  &.theme--dark.v-expansion-panels .v-expansion-panel,
  &.theme--light.v-expansion-panels .v-expansion-panel {
    background: transparent;
  }

  &__header {
    padding: 0;
    min-height: 0 !important;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-medium;
  }

  &__header-content {
    display: flex;
  }

  &__button {
    letter-spacing: initial;
    flex-grow: 1;
  }

  &__content {
    > div {
      padding: 0 0;
    }
  }
}
</style>
