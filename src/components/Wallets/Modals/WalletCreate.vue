<template>
  <modal-wrapper
    class="wallet-create-modal"
    value
    :title="modalTitle"
    :disable-confirm-button="!selectedAssetGroup || disabledCreateButton"
    :confirm-button-label="confirmButtonLabel"
    :center="isCenter"
    @input="close"
    @submit="create"
    @cancel="close"
  >
    <template v-if="isCenter" #header>
      <div class="wallet-create-modal__header">
        <div class="wallet-create-modal__title">{{ modalTitle }}</div>
        <swap-button icon @click="close">
          <v-icon size="32">mdi-close</v-icon>
        </swap-button>
      </div>
    </template>

    <v-loader :active="loading" />
    <template v-if="!selectedAssetGroup">
      <form-text-field
        v-model="currencySearchString"
        placeholder="Enter name of currency"
        class="wallet-create-modal__search"
        @input="searchAssets"
      />

      <div class="wallet-create-modal__list">
        <div
          v-for="(item, index) in filteredCurrencies"
          :key="index"
          class="wallet-create-modal__currency"
          data-test-id="wallet-currency"
          @click="selectedAssetGroup = item"
        >
          <coin-logo class="wallet-create-modal__currency-icon" :path="item.logo" :name="item.symbol" />
          <div class="wallet-create-modal__asset-info">
            <span class="wallet-create-modal__asset-symbol"
              >{{ item.symbol }} <small>{{ getUniqueAssets(item) }}</small></span
            >
            <span class="wallet-create-modal__asset-name">{{ item.name }}</span>
          </div>
        </div>
        <infinite-loading v-if="!currencySearchString && assets.length" @infinite="infiniteHandler">
          <template #spinner>
            <v-loader :active="true" width="25" />
          </template>
        </infinite-loading>
      </div>
    </template>

    <template v-else>
      <wallet-create-network
        :asset.sync="selectedAsset"
        :network.sync="selectedNetwork"
        :asset-group="selectedAssetGroup"
        @back="reset"
      />
    </template>

    <template v-if="!selectedAssetGroup" #footer>
      <span></span>
    </template>
    <template v-else-if="isCenter" #footer>
      <swap-button large block :disabled="disabledCreateButton" @click="create">Create</swap-button>
    </template>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from '@/components/UI/ModalWrapper.vue'
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
    FormTextField,
    CoinLogo,
    WalletCreateNetwork,
    VLoader,
    InfiniteLoading
  },
  inject: ['mediaQueries'],
  props: {
    isCenter: { type: Boolean, default: false }
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

  created() {
    this.fetchAssets()
  },

  methods: {
    getUniqueAssets(group) {
      const allAssets = group.networks.reduce((assets, network) => {
        const otherAssets = network.assets.filter(asset => asset.symbol !== group.symbol)
        return [...assets, ...otherAssets.map(asset => asset.symbol)]
      }, [])

      const uniqueAssets = [...new Set(allAssets)]

      return uniqueAssets.length ? `(${uniqueAssets.join(', ')})` : ''
    },
    fetchAssets() {
      this.loading = true

      networksService
        .fetchAssets({ from: 0, size: ASSETS_PAGE_COUNT })
        .then(assets => {
          this.assets = assets
          this.assetsOffset += assets.length
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
      networksService.fetchAssets({ from: this.assetsOffset, size: ASSETS_PAGE_COUNT }).then(assets => {
        if (assets.length) {
          this.assetsOffset += assets.length
          this.assets.push(...assets)
          $state.loaded()
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
              network: {
                name: this.selectedNetwork.network.name,
                logo: this.selectedNetwork.network.logo,
                slug: this.selectedNetwork.network.slug
              },
              asset: {
                name: this.selectedAssetGroup.name,
                logo: this.selectedAssetGroup.logo,
                symbol: this.selectedAssetGroup.symbol
              },
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
    }
  }
}
</script>

<style lang="scss">
.wallet-create-modal {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
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

    .v-slide-group__content {
      padding: 0;
    }
  }

  &__subtitle {
    color: $--grey-3;
    font-weight: $--font-weight-semi-bold;
    margin-bottom: 10px;
  }

  &__list {
    overflow: auto;
  }

  &__asset-info {
    display: flex;
    flex-direction: column;
  }

  &__asset-symbol {
    font-size: $--font-size-medium;
  }

  &__asset-name {
    color: $--grey;
    font-size: $--font-size-small;
  }

  &__currency {
    display: flex;
    align-items: center;
    padding: 8px 4px;
    border-radius: $--main-border-radius;
    &:hover {
      background-color: get-theme-for($button, 'primary', 'hover');
      cursor: pointer;
    }
  }

  &__currency-icon {
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }

  &__tip {
    color: $--grey-3;
    text-align: center;
  }
}
</style>
