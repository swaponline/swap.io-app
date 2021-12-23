<template>
  <v-dialog v-model="localValue" width="500" content-class="select-wallet" :overlay-opacity="0.3">
    <v-card class="select-wallet__card">
      <v-card-title class="select-wallet__header">
        <span class="select-wallet__title">
          {{ dialogTitle }}
        </span>

        <swap-button icon @click="close">
          <v-icon size="26">mdi-close</v-icon>
        </swap-button>
      </v-card-title>

      <v-card-text class="select-wallet__body">
        <template v-if="!isExternalWallet">
          <form-text-field
            v-model="search"
            placeholder="Search by name or paste the address"
            class="select-wallet__input"
          />

          <swap-button small class="select-wallet__button" @click="openExternalWallet">Use external wallet</swap-button>

          <div class="select-wallet__list">
            <wallet-preview
              v-for="(wallet, index) in filteredWallets"
              :key="index"
              v-bind="wallet"
              class="select-wallet__item"
              @click="selectWallet(wallet)"
            />
          </div>
        </template>

        <template v-else>
          <form-text-field
            v-model="externalWalletAddress"
            placeholder="Enter the wallet address"
            class="select-wallet__input"
          />

          <div class="select-wallet__chips">
            <div class="select-wallet__subtitle">Select networks</div>
            <v-chip-group v-model="selectedNetwork" column>
              <v-chip v-for="item in networks" :key="item" class="select-wallet__chip" :value="item">
                {{ item }}
              </v-chip>
            </v-chip-group>
          </div>

          <div class="select-wallet__currency">
            <div class="select-wallet__subtitle">Wallet currency</div>
            <v-select
              v-model="selectedCurrency"
              :items="currencies"
              hide-details
              flat
              outlined
              item-color
              placeholder="Select currency"
              append-icon="mdi-chevron-down"
              class="select-wallet__select"
            />
          </div>

          <swap-button
            :disabled="isExternalSubmitDisabled"
            large
            class="select-wallet__submit"
            @click="submitExternalWallet"
            >Use external wallet</swap-button
          >
        </template>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import FormTextField from '@/components/UI/Forms/TextField.vue'
import WalletPreview from '@/components/Wallets/WalletPreview.vue'
import { cryptoCurrencies } from '@/services/converter'
import { walletsService, events } from '@/services/wallets'

export default {
  name: 'SwapSelectWalletDialog',
  components: { FormTextField, WalletPreview },
  props: {
    value: { type: Boolean, default: false }
  },
  data() {
    return {
      search: '',

      isExternalWallet: false,
      externalWalletAddress: '',
      selectedNetwork: null,
      selectedCurrency: null,
      wallets: walletsService.getCurrentWallets(),
      subscriptions: []
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('update:value', val)
      }
    },
    dialogTitle() {
      return this.isExternalWallet ? 'External wallet' : 'Select source wallet'
    },
    filteredWallets() {
      const { wallets } = this
      const search = this.search.toLowerCase()

      if (!this.search) return wallets

      const filteredWallets = wallets.filter(
        ({ coin, name, address }) =>
          coin.toLowerCase().includes(search) ||
          name?.toLowerCase().includes(search) ||
          address.toLowerCase().includes(search)
      )

      return filteredWallets
    },
    networks() {
      return ['Ethereum', 'Bitcoin', 'Binance Smart Chain', 'Kusama']
    },
    currencies() {
      return cryptoCurrencies
    },
    isExternalSubmitDisabled() {
      return !this.externalWalletAddress || !this.selectedNetwork || !this.selectedCurrency
    }
  },

  created() {
    this.subscriptions.push(
      walletsService.subscribe(events.REFRESH_CURRENT_WALLETS, wallets => {
        this.wallets = wallets
      })
    )
  },

  beforeDestroy() {
    this.subscriptions.forEach(callback => callback.unsubscribe())
  },

  methods: {
    reset() {
      this.isExternalWallet = false
      this.search = ''
      this.externalWalletAddress = ''
      this.selectedNetwork = null
      this.selectedCurrency = null
    },
    close() {
      this.localValue = false
      this.reset()
    },
    openExternalWallet() {
      this.isExternalWallet = true
    },
    selectWallet(wallet) {
      this.$emit('select', wallet)
      this.close()
    },
    submitExternalWallet() {
      const wallet = {
        address: this.externalWalletAddress,
        currencyName: this.selectedCurrency,
        network: this.selectedNetwork
      }
      this.$emit('select', wallet)
      this.close()
    }
  }
}
</script>

<style lang="scss">
.select-wallet {
  border-radius: 12px;

  .v-card {
    background-color: get-theme-for($background, 'primary');
  }

  &__card {
    height: 600px;
  }

  &__body {
    display: flex;
    flex-direction: column;
    height: 538px;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__title {
    font-size: $--font-size-extra-small-subtitle !important;
    font-weight: $--font-weight-semi-bold !important;
  }
  &__input {
    margin-bottom: 16px;
  }
  &__button {
    margin-bottom: 20px;
    align-self: flex-start;
  }
  &__list {
    border-radius: $--main-border-radius;
    overflow: auto;
    max-height: 400px;
    margin-bottom: 48px;
  }
  &__item {
    &:hover {
      background-color: get-theme-for($button, 'primary', 'pressed');
      cursor: pointer;
    }
    &:not(:last-child) {
      border-bottom: 1px solid get-theme-for($button, 'primary', 'pressed');
    }
  }

  &__chips {
    margin-bottom: 16px;
  }
  &__subtitle {
    font-size: $--font-size-extra-small-subtitle;
    font-weight: $--font-weight-semi-bold;
    margin-bottom: 10px;
  }
  &__chip {
    padding: 0 8px !important;
    border-radius: 4px !important;
    background-color: get-theme-for($button, 'primary', 'enabled') !important;
  }
  &__select {
    fieldset {
      border-width: 2px;
      border-color: get-theme-for($border-color, 'primary');
    }
    &.v-input--is-focused {
      fieldset {
        border-color: var(--main-color);
      }
      .v-icon {
        color: var(--main-color) !important;
      }
    }
  }
  &__submit {
    margin-top: auto;
  }
}
</style>
