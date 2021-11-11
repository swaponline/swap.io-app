<template>
  <div class="wallets">
    <template v-if="hasWallets">
      <list-wallet
        class="wallets__list"
        :class="{ 'wallets__list--show': !activeWallet || isDesktop }"
        :wallets="wallets"
        :active-wallet="activeWallet"
      />

      <div class="wallets__content" :class="{ 'wallets__content--hide': !activeWallet }">
        <transition-translate :reverse="metaBack">
          <wallet-content class="wallets__wallet" :wallet="activeWallet" />
        </transition-translate>
      </div>
    </template>

    <wallets-create v-else />

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
import WalletContent from '@/components/Wallets/WalletContent.vue'
import { walletsService, events as walletsEvents } from '@/services/wallets'

export default {
  name: 'Wallet',
  inject: ['mediaQueries'],
  components: { TransitionTranslate, MainActions, AllModals, ListWallet, WalletsCreate, WalletContent },
  props: {
    address: { type: String, default: '' },
    coin: { type: String, default: '' },
    networkId: { type: String, default: '' }
  },
  data() {
    return {
      wallets: walletsService.getCurrentWallets(),
      subscriptions: []
    }
  },
  computed: {
    isDesktop() {
      return this.mediaQueries.desktop
    },
    activeWallet() {
      return this.wallets.find(
        wallet =>
          wallet.address === this.address &&
          wallet.coin.toLowerCase() === this.coin.toLowerCase() &&
          wallet.networkId.toLowerCase() === this.networkId.toLowerCase()
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
    },
    activeWallet() {
      this.setActiveWallet()
    }
  },

  created() {
    this.subscriptions.push(
      walletsService.subscribe(walletsEvents.REFRESH_CURRENT_WALLETS, wallets => {
        this.wallets = wallets
      })
    )
  },

  beforeDestroy() {
    this.subscriptions.forEach(callback => callback.unsubscribe())
  },

  methods: {
    setActiveWallet() {
      if (!this.activeWallet) {
        if (this.hasWallets && this.isDesktop) {
          const { address, coin, networkId } = this.wallets[0]

          this.$router.replace({
            name: 'Wallets',
            params: { address, networkId, coin: coin.toLowerCase() }
          })
        } else if (this.coin) {
          this.$router.replace({ name: 'Wallets' })
        }
      }
    }
  }
}
</script>

<style lang="scss">
.wallets {
  height: 100%;
  display: flex;
  position: relative;
  max-height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  padding-top: 20px;

  @include phone {
    overflow: visible;
    padding-top: 12px;
  }
  @include small-height {
    max-height: none;
  }
  &__list {
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

  &__content {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;

    @include only-desktop {
      &--created {
        padding: 0 100px 0;
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
        padding: 0 40px;
      }
    }

    @include phone {
      &--created {
        padding: 20px;
      }
    }
  }
  &__wallet {
    position: relative;
    @include tablet {
      // убираем анимацию оставляем только transition
      transform: translateX(0) !important;
      opacity: 1 !important;
    }
  }
}
</style>
