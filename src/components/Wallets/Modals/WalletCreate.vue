<template>
  <component
    :is="wrapperComponent"
    value
    class="wallet-create-modal"
    :class="{ 'wallet-create-modal--block': asBlock }"
    :title="modalTitle"
    :disable-confirm-button="!selectedCurrency || disabledCreateButton"
    :confirm-button-label="confirmButtonLabel"
    modificator="full-height"
    @input="checkClose"
    @submit="create"
    @cancel="close"
  >
    <div v-if="asBlock" class="wallet-create-modal__header">
      <div class="wallet-create-modal__title">{{ modalTitle }}</div>
      <swap-button icon @click="close">
        <v-icon size="32">mdi-close</v-icon>
      </swap-button>
    </div>

    <v-loader :active="loading" />
    <template v-if="!selectedCurrency">
      <form-text-field
        v-model="currencySearchString"
        placeholder="Enter name of currency"
        class="wallet-create-modal__search"
        @input="searchAssets"
      />

      <div class="wallet-create-modal__chips">
        <div class="wallet-create-modal__subtitle">Most popular</div>
        <v-chip-group v-model="selectedCurrency" column>
          <v-chip v-for="(item, index) in mostPopular" :key="index" class="wallet-create-modal__chip" :value="item">
            <coin-logo class="wallet-create-modal__chip-icon" :path="item.logo" :name="item.symbol" />
            {{ item.name }}
          </v-chip>
        </v-chip-group>
      </div>

      <v-divider class="wallet-create-modal__divider" />

      <div class="wallet-create-modal__list">
        <div
          v-for="(item, index) in filteredCurrencies"
          :key="index"
          class="wallet-create-modal__currency"
          @click="selectedCurrency = item"
        >
          <coin-logo class="wallet-create-modal__currency-icon" :path="item.logo" :name="item.symbol" />
          <span class="wallet-create-modal__currency-name">{{ item.name }}</span>
        </div>
      </div>

      <div v-if="asBlock" class="wallet-create-modal__tip">Select currency</div>
    </template>

    <template v-else>
      <wallet-create-network
        :asset.sync="selectedAsset"
        :network.sync="selectedNetwork"
        :asset-group="selectedCurrency"
        @back="reset"
      />

      <swap-button
        v-if="asBlock"
        large
        :disabled="disabledCreateButton"
        class="wallet-create-modal__submit"
        @click="create"
        >Create</swap-button
      >
    </template>
  </component>
</template>

<script>
import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import TypeCurrencyCard from '@/components/Wallets/TypeCurrencyCard.vue'
import FormTextField from '@/components/UI/Forms/TextField.vue'
import CoinLogo from '@/components/Wallets/CoinLogo.vue'
import WalletCreateNetwork from '@/components/Wallets/Modals/WalletCreateNetwork.vue'
import VLoader from '@/components/Loaders/VLoader.vue'

import networksService from '@/services/networks'
import SwapKeysApi from '@/keys-api'
import { profilesService } from '@/services/profiles'
import { walletsService } from '@/services/wallets'
import { debounce } from '@/utils/common'

export default {
  name: 'WalletCreate',
  components: { ModalWrapper, TypeCurrencyCard, FormTextField, CoinLogo, WalletCreateNetwork, VLoader },
  props: {
    asBlock: { type: Boolean, default: false }
  },
  data() {
    return {
      modalValue: true,
      loading: false,
      currencySearchString: '',
      mostPopular: [],
      assets: [],
      searchedAssets: [],

      selectedAsset: null,
      selectedNetwork: null,
      selectedCurrency: null
    }
  },
  computed: {
    wrapperComponent() {
      return this.asBlock ? 'div' : ModalWrapper
    },
    filteredCurrencies() {
      if (this.currencySearchString) {
        return this.searchedAssets
      }
      return this.assets
    },
    modalTitle() {
      if (this.selectedCurrency) return 'Choose network'
      return 'New wallet'
    },
    confirmButtonLabel() {
      return this.selectedCurrency === 'custom' ? 'Next' : 'Confirm'
    },
    disabledCreateButton() {
      return !this.selectedAsset
    }
  },

  mounted() {
    this.fetchMostPopular()
  },

  methods: {
    fetchMostPopular() {
      this.loading = true
      networksService
        .fetchAssets({ from: 0, size: 7 })
        .then(assets => {
          this.mostPopular = assets
        })
        .finally(() => {
          this.loading = false
        })
    },
    // eslint-disable-next-line func-names
    searchAssets: debounce(function() {
      if (this.currencySearchString.length > 1) {
        networksService.searchAssets(this.currencySearchString).then(assets => {
          this.searchedAssets = assets
        })
      } else {
        this.searchedAssets = []
      }
    }, 300),

    reset() {
      this.selectedCurrency = null
      this.selectedNetwork = null
      this.selectedAsset = null
    },

    create() {
      const { id: profileId } = profilesService.getCurrentProfile()
      const newWallet = {
        profileId,
        networkId: this.selectedNetwork.network.slug,
        coin: this.selectedAsset.symbol
      }
      const countWallets = walletsService
        .getCurrentWallets()
        .filter(({ networkId, coin }) => networkId === newWallet.networkId && coin === newWallet.coin)

      this.loading = true
      SwapKeysApi.createWallet({ ...newWallet, walletNumber: countWallets.length })
        .then(({ wallet }) => {
          if (wallet) {
            walletsService.createWallet({
              ...wallet,
              coinName: this.selectedAsset.name,
              logo: this.selectedAsset.logo,
              networkLogo: this.selectedNetwork.network.logo,
              networkName: this.selectedNetwork.network.name
            })
            this.close()
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    close() {
      this.$emit('close')
    },

    checkClose() {
      if (!this.asBlock) {
        this.close()
      }
    }
  }
}
</script>

<style lang="scss">
.wallet-create-modal {
  &--block {
    max-width: 412px;
    width: 100%;
    height: 608px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__title {
    font-size: $--font-size-extra-small-subtitle;
    font-weight: $--font-weight-semi-bold;
  }

  &__search {
    margin-bottom: 14px;
  }

  &__chips {
    margin-bottom: 16px;
  }

  &__subtitle {
    color: $--grey-3;
    font-weight: $--font-weight-semi-bold;
    margin-bottom: 10px;
  }

  &__chip {
    padding: 0 8px !important;
    border-radius: $--border-radius-small !important;
    background-color: var(--main-button-background) !important;
  }

  &__chip-icon {
    margin-right: 6px;
    width: 20px;
  }

  &__divider {
    border-color: var(--main-border-color) !important;
    margin-bottom: 16px;
  }

  &__list {
    overflow: auto;
    margin-bottom: 16px;
  }

  &__currency {
    display: flex;
    align-items: center;
    padding: 8px 4px;
    border-radius: $--main-border-radius;
    &:hover {
      background-color: var(--main-button-background-hover);
      cursor: pointer;
    }
  }

  &__currency-icon {
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }

  &__currency-name {
    font-size: $--font-size-medium;
  }

  &__submit {
    margin-top: auto;
  }

  &__tip {
    color: $--grey-3;
    text-align: center;
  }
}
</style>
