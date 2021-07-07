<template>
  <div class="total-wallet-sum">
    <span class="total-wallet-sum__title">Total</span>
    <v-select
      append-icon="mdi-chevron-down"
      class="total-wallet-sum__selector"
      :value="'USD'"
      flat
      solo
      filled
      dense
      :items="['USD', 'EUR', 'GBP']"
      item-color
      :menu-props="{ 'content-class': 'total-wallet-sum__selector-menu' }"
    >
    </v-select>
    <v-badge left :content="accountNotifications" :value="accountNotifications" color="red" offset-x="120%">
      <div class="total-wallet-sum__value">{{ accountBalance }}</div>
    </v-badge>
  </div>
</template>

<script>
export default {
  name: 'TotalWalletSum',
  computed: {
    accountBalance() {
      const balance = this.$store.getters.accountBalance
      return Math.round(balance * 100) / 100
    },
    accountNotifications() {
      return this.$store.getters.accountNotifications
    }
  }
}
</script>

<style lang="scss">
.total-wallet-sum {
  width: 100%;
  height: 100%;
  min-height: 80px;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid $--light-grey;
  background: $--white;

  &__title {
    font-size: $--font-size-small-subtitle;
    font-weight: $--font-weight-semi-bold;
    color: $--grey-3;
    flex-grow: 1;
  }
  &__selector {
    max-width: 160px;
    margin-right: 12px !important;
    margin-left: auto !important;
    flex: 0 !important;

    .v-input__slot {
      padding: 0 4px 0 8px !important;
      box-shadow: none;
      margin-bottom: 0 !important;
      font-size: $--font-size-medium;
    }
    .v-input__control {
      width: unset !important;
      flex-grow: 0;
    }
    .v-input__append-inner {
      padding-left: 0 !important;
    }
    .v-input__icon {
      min-width: 18px;
      width: 18px;
      .v-icon {
        color: $--grey-3 !important;
        font-size: 16px;
      }
    }
    .v-text-field__details {
      display: none;
    }
    .v-select__slot {
      width: unset !important;
    }
    .v-select__selection {
      color: $--grey-3;
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
    font-size: $--font-size-small-subtitle;
    font-weight: $--font-weight-semi-bold;
  }
}
</style>
