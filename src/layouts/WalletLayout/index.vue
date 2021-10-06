<template>
  <div class="wallet-layout">
    <template v-if="hasWallets">
      <list-wallet
        class="wallet-layout__list-wallet"
        :class="{ 'wallet-layout__list-wallet--show': !activeWallet }"
        :wallets="wallets"
        :active-wallet="activeWallet"
      ></list-wallet>

      <div class="wallet-layout__router" :class="{ 'wallet-layout__router--hide': !activeWallet }">
        <transition-translate :reverse="metaBack">
          <router-view :wallet="activeWallet" class="wallet-layout__router-content"></router-view>
        </transition-translate>
      </div>
    </template>

    <div v-else class="wallet-layout__router wallet-layout__router--created">
      <wallets-create />
    </div>

    <main-actions v-if="hasWallets" />
    <all-modals />
  </div>
</template>

<script>
import TransitionTranslate from '@/components/Transitions/Translate.vue'
import ListWallet from '@/components/Wallets/ListWallet/index.vue'
import MainActions from '@/components/Wallets/MainActions.vue'
import AllModals from '@/components/Wallets/Modals/AllModals.vue'
import WalletsCreate from '@/components/Wallets/WalletsCreate.vue'

const WALLETS = [
  {
    network: 'ETH',
    coin: 'ETH',
    walletNumber: 0,
    address: '3WfGVzwANjbaLh6fokA41qtwMikpFWXSJtHS7uvrJQGV',
    publicKey: '3WfGVzwANjbaLh6fokA41qtwMikpFWXSJtHS7uvrJQGV',

    value: 0.005
  },
  {
    network: 'BTC',
    coin: 'BTC',
    walletNumber: 0,
    address: '0x912fD21d7a69678227fE6d08C64222Db41477bA0',
    publicKey: '0x912fD21d7a69678227fE6d08C64222Db41477bA0',
    name: 'Default',

    value: 0.0456
  },
  {
    network: 'BTC',
    coin: 'USDT',
    walletNumber: 0,
    address: '0xd19615f2Eab2ABfBF7ca16618b5eD43386374DD0',
    publicKey: '0xd19615f2Eab2ABfBF7ca16618b5eD43386374DD0',
    name: 'Main',

    value: 0.005
  },
  {
    network: 'BTC',
    coin: 'USDT',
    walletNumber: 1,
    address: '0xF2eDB7Ac87119e9ea68CDa5269E23c21e51EDc4e',
    publicKey: '0xF2eDB7Ac87119e9ea68CDa5269E23c21e51EDc4e',

    value: 0.0567
  },
  {
    network: 'BNB',
    coin: 'EOS',
    walletNumber: 0,
    address: '0x8CDa5269E23c2F2eDB7Ac871',
    publicKey: '0x8CDa5269E23c2F2eDB7Ac871',
    name: 'Swaps',

    value: 0
  }
]

export default {
  name: 'WalletLayout',
  inject: ['mediaQueries'],
  components: {
    TransitionTranslate,
    ListWallet,
    MainActions,
    AllModals,
    WalletsCreate
  },
  props: {
    coin: { type: String, default: '' },
    walletAddress: { type: String, default: '' }
  },
  computed: {
    isDesktop() {
      return this.mediaQueries.desktop
    },
    wallets() {
      return WALLETS
    },
    activeWallet() {
      return this.wallets.find(
        wallet => wallet.address === this.walletAddress && wallet.coin.toLowerCase() === this.coin.toLowerCase()
      )
    },
    hasWallets() {
      return !!this.wallets.length
    },
    metaBack() {
      return this.$route.meta.back
    }
  },

  watch: {
    isDesktop() {
      this.setActiveWallet()
    },
    wallets: {
      immediate: true,
      handler() {
        this.setActiveWallet()
      }
    }
  },

  methods: {
    setActiveWallet() {
      if (!this.activeWallet && this.wallets.length > 0 && this.isDesktop) {
        const { address, coin } = this.wallets[0]

        this.$router.replace({
          name: 'Wallet',
          params: { walletAddress: address, coin: coin.toLowerCase() }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.wallet-layout {
  height: 100%;
  display: flex;
  position: relative;
  margin-top: 20px;
  max-height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  @include tablet {
    margin-top: 0;
  }
  @include phone {
    overflow: visible;
  }
  @include small-height {
    max-height: none;
  }
  &__list-wallet {
    margin-right: 20px;
    @include tablet {
      margin-right: 0;
      position: absolute;
      max-width: none;
      transform: translateX(-100vw);
      transition: 0.5s;
      &--show {
        transform: translateX(0);
      }
    }
  }
  &__router {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;

    @include only-desktop {
      &--created {
        padding: 15px 100px 0;
      }
    }

    @include tablet {
      overflow: visible;
      position: absolute;
      transform: translateX(0);
      transition: 0.5s;
      &--hide {
        transform: translateX(100vw);
      }
      &--created {
        padding: 20px 40px;
      }
    }

    @include phone {
      &--created {
        padding: 20px;
      }
    }
  }
  &__router-content {
    position: relative;
    @include tablet {
      // убираем анимацию оставляем только transition
      transform: translateX(0) !important;
      opacity: 1 !important;
    }
  }
}
</style>
