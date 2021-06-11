<template>
  <div class="total-wallet-sum">
    <v-select
      append-icon="mdi-chevron-down"
      class="total-wallet-sum__selector"
      :value="'USD'"
      flat
      solo
      filled
      :items="['USD', 'EUR', 'GBP']"
      item-color
      :menu-props="{ 'content-class': 'total-wallet-sum__selector-menu' }"
    >
    </v-select>
    <div class="total-wallet-sum__value">567.12</div>
  </div>
</template>

<script>
export default {
  name: 'TotalWalletSum'
}
</script>

<style lang="scss">
.total-wallet-sum {
  width: 100%;
  height: 100%;
  min-height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid $--light-grey;
  &__selector {
    max-width: 160px;
    padding: 0 13px !important;

    .v-input__slot {
      box-shadow: none;
      margin-bottom: 0;
      font-size: $--font-size-small-subtitle;
    }
    .v-input__icon .v-icon {
      color: var(--main-color) !important;
    }
    .v-text-field__details {
      display: none;
    }
    .v-select__selections {
      > div {
        text-overflow: auto;
      }
      > input {
        display: none;
      }
    }
  }

  &__selector-menu {
    .v-list-item--active {
      color: var(--main-color);
    }
  }

  &__value {
    padding: 0 25px;
    font-size: $--font-size-small-subtitle;
  }
}
</style>
