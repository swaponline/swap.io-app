<template>
  <div class="total-wallet-summ">
    <v-select
      append-icon="mdi-chevron-down"
      class="total-wallet-summ__selector"
      :value="'USD'"
      flat
      solo
      :items="['USD', 'EUR', 'GBP']"
    >
    </v-select>
    <div class="total-wallet-summ__value">567.12</div>
  </div>
</template>

<script>
export default {
  name: 'TotalWalletSumm'
}
</script>

<style lang="scss">
.total-wallet-summ {
  width: 100%;
  height: 100%;
  min-height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid $--light-grey;
  &__selector {
    max-width: 50%;
    padding: 0 13px !important;
    .v-input__slot {
      box-shadow: none;
      margin-bottom: 0;
      font-size: $--font-size-small-subtitle;
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

  &__value {
    padding: 0 25px;
    font-size: $--font-size-small-subtitle;
  }
}
</style>
