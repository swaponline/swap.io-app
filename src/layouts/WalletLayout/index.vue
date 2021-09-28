<template>
  <div class="wallet-layout">
    <template v-if="hasWallets">
      <list-wallet
        class="wallet-layout__list-wallet"
        :class="{ 'wallet-layout__list-wallet--show': showListWallet }"
      ></list-wallet>

      <div class="wallet-layout__router" :class="{ 'wallet-layout__router--hide': showListWallet }">
        <transition-translate :reverse="metaBack">
          <router-view :key="currentRoute" class="wallet-layout__router-content"></router-view>
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
  computed: {
    currentRoute() {
      if (this.mediaQueries.desktop) {
        return this.$route.name
      }
      return this.$route.name + JSON.stringify(this.$route.params)
    },
    hasWallets() {
      return !!this.$store.getters.currentWallets.length
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
