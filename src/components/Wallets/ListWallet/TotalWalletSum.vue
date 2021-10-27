<template>
  <div class="total-wallet-sum">
    <span class="total-wallet-sum__title">Total:</span>

    <v-expansion-panels
      v-model="isOpenPanel"
      v-click-outside="closePanel"
      flat
      class="total-wallet-sum__currency-select"
    >
      <v-expansion-panel
        v-model="isOpenPanel"
        dense
        class="total-wallet-sum__inner"
        active-class="total-wallet-sum__inner--active"
      >
        <v-expansion-panel-header class="total-wallet-sum__current-currency">
          {{ currency }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list elevation="0" class="total-wallet-sum__currency-list">
            <v-list-item
              v-for="item in filteredCurrencyList"
              :key="item"
              class="total-wallet-sum__currency-item"
              @click="updateCurrency(item)"
            >
              <span>{{ item }}</span>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <div class="total-wallet-sum__value">{{ totalValue }}</div>
  </div>
</template>

<script>
export default {
  name: 'TotalWalletSum',
  props: {
    totalValue: { type: Number, default: 0 }
  },
  data() {
    return {
      currency: 'USD',
      currencyList: ['USD', 'EUR', 'GBP'],
      isOpenPanel: false
    }
  },
  computed: {
    filteredCurrencyList() {
      return this.currencyList.filter(currency => currency !== this.currency)
    }
  },
  methods: {
    updateCurrency(newValue) {
      this.currency = newValue
      this.closePanel()
    },
    closePanel() {
      this.isOpenPanel = false
    }
  }
}
</script>

<style lang="scss">
.total-wallet-sum {
  width: 100%;
  height: 100%;
  min-height: 42px;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid get-theme-for($border-color, 'primary');
  background: get-theme-for($background, 'primary');

  &__currency-select {
    height: $--button-size-small;
    width: auto;

    .v-expansion-panel-content__wrap {
      padding: 0;
    }
  }

  &__inner {
    overflow: hidden;
    background-color: transparent !important;
    border: 1px solid transparent;

    &--active {
      border-color: get-theme-for($background, 'secondary');
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
    }
  }

  &__current-currency {
    font-size: $--font-size-base;
    font-weight: $--font-weight-semi-bold;
    color: $--grey-3;
    min-height: $--button-size-small !important;
    padding: 0 4px;

    .v-icon {
      color: inherit !important;
    }
  }

  &__currency-list {
    width: 100%;
    padding: 0;
  }

  &__currency-item {
    padding: 0 6px;
    font-size: $--font-size-base;
    font-weight: $--font-weight-semi-bold;
    min-height: $--button-size-small;

    &.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
      color: $--grey-3 !important;
    }

    &:hover {
      background-color: get-theme-for($button, 'primary', 'hover');
    }
  }

  &__title {
    font-size: $--font-size-base;
    font-weight: $--font-weight-semi-bold;
    color: $--grey-3;
    flex-grow: 1;
  }

  &__value {
    font-size: $--font-size-base;
    font-weight: $--font-weight-semi-bold;
  }
}
</style>
