<template>
  <component
    :is="wrapperComponent"
    class="wallet-create-modal"
    :class="{ 'wallet-create-modal--block': asBlock }"
    value
    :title="modalTitle"
    :disable-confirm-button="!selectedAssetGroup || disabledCreateButton"
    :confirm-button-label="confirmButtonLabel"
    modificator="full-height"
    @input="inputClose"
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
    <template v-if="!selectedAssetGroup">
      <form-text-field
        v-model="currencySearchString"
        placeholder="Enter name of currency"
        class="wallet-create-modal__search"
        @input="searchAssets"
      />

      <div class="wallet-create-modal__chips">
        <div class="wallet-create-modal__subtitle">Most popular</div>
        <v-chip-group v-model="selectedAssetGroup" column>
          <v-chip
            v-for="(item, index) in mostPopularAssets"
            :key="index"
            class="wallet-create-modal__chip"
            :value="item"
          >
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
          @click="selectedAssetGroup = item"
        >
          <coin-logo class="wallet-create-modal__currency-icon" :path="item.logo" :name="item.symbol" />
          <span class="wallet-create-modal__currency-name">{{ item.name }}</span>
        </div>
        <infinite-loading v-if="!currencySearchString" @infinite="infiniteHandler">
          <template #spinner>
            <v-loader :active="true" width="25" />
          </template>
        </infinite-loading>
      </div>

      <div v-if="asBlock" class="wallet-create-modal__tip">Select currency</div>
    </template>

    <template v-else>
      <wallet-create-network
        :asset.sync="selectedAsset"
        :network.sync="selectedNetwork"
        :asset-group="selectedAssetGroup"
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

import InfiniteLoading from 'vue-infinite-loading'
import networksService from '@/services/networks'
import SwapKeysApi from '@/keys-api'
import { profilesService } from '@/services/profiles'
import { walletsService } from '@/services/wallets'
import { debounce } from '@/utils/common'

const ASSETS_PAGE_COUNT = 20

export default {
  name: 'WalletCreate',
  components: {
    ModalWrapper,
    TypeCurrencyCard,
    FormTextField,
    CoinLogo,
    WalletCreateNetwork,
    VLoader,
    InfiniteLoading
  },
  props: {
    asBlock: { type: Boolean, default: false }
  },
  data() {
    return {
      loading: false,
      currencySearchString: '',
      assets: [],
      searchedAssets: [],

      assetsOffset: 0,

      selectedAssetGroup: null,
      selectedNetwork: null,
      selectedAsset: null
    }
  },
  computed: {
    mostPopularAssets() {
      return this.assets.slice(0, 6)
    },
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
      if (this.selectedAssetGroup) return 'Choose network'
      return 'New wallet'
    },
    confirmButtonLabel() {
      return this.selectedAssetGroup === 'custom' ? 'Next' : 'Confirm'
    },
    disabledCreateButton() {
      return !this.selectedAsset
    }
  },

  methods: {
    fetchAssets() {
      this.loading = true
      debugger
      networksService
        .fetchAssets({ from: 0, size: ASSETS_PAGE_COUNT })
        .then(assets => {
          this.assets = assets
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

    infiniteHandler($state) {
      if (this.assetsOffset === 0) {
        this.loading = true
      }

      networksService.fetchAssets({ from: this.assetsOffset, size: ASSETS_PAGE_COUNT }).then(assets => {
        if (assets.length) {
          this.assetsOffset += assets.length
          this.assets.push(...assets)
          $state.loaded()
          this.loading = false
        } else {
          $state.complete()
        }
      })
    },

    reset() {
      this.selectedAssetGroup = null
      this.selectedNetwork = null
      this.selectedAsset = null
    },

    create() {
      const profileId = profilesService.getCurrentProfileId()
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
            walletsService.addWallet({
              ...wallet,
              coinName: this.selectedAsset.name,
              logo: this.selectedAsset.logo,
              networkLogo: this.selectedNetwork.network.logo,
              networkName: this.selectedNetwork.network.name,
              name: '',
              value: 0
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

    // TODO: refactoring modalWrapper
    inputClose() {
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
    height: 20px;
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
