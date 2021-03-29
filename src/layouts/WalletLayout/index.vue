<template>
  <div class="wallet-layout">
    <list-wallet
      class="wallet-layout__list-wallet"
      :class="{ 'wallet-layout__list-wallet--show': showListWallet }"
    ></list-wallet>
    <div class="wallet-layout__router" :class="{ 'wallet-layout__router--hide': showListWallet }">
      <transition-translate :reverse="metaBack">
        <router-view :key="currentRoute" class="wallet-layout__router-content"></router-view>
      </transition-translate>
    </div>
    <main-actions></main-actions>

    <all-modals></all-modals>
  </div>
</template>

<script>
import TransitionTranslate from '@/components/Transitions/Translate.vue'
import ListWallet from '@/components/Wallets/ListWallet/index.vue'
import MainActions from '@/components/Wallets/MainActions.vue'
import AllModals from '@/components/Wallets/Modals/AllModals.vue'

export default {
  name: 'WalletLayout',
  inject: ['mediaQueries'],
  components: {
    TransitionTranslate,
    ListWallet,
    MainActions,
    AllModals
  },
  computed: {
    currentRoute() {
      if (this.mediaQueries.desktop) {
        return this.$route.name
      }
      return this.$route.name + JSON.stringify(this.$route.params)
    },
    walletParam() {
      return this.$route.params.walletAddress
    },
    metaBack() {
      return this.$route.meta.back
    },
    showListWallet() {
      return this.$route.name === 'Wallet' && this.$route.params.walletAddress === undefined
    }
  }
}
</script>

<style lang="scss">
.wallet-layout {
  height: 100%;
  display: flex;
  position: relative;
  margin-top: 25px;
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
    @include tablet {
      overflow: visible;
      position: absolute;
      transform: translateX(0);
      transition: 0.5s;
      &--hide {
        transform: translateX(100vw);
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
