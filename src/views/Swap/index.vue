<template>
  <div class="swap" :class="{ 'swap--open-list': isOpenMenu }">
    <swap-form
      :is-open-to-list="currentWallet === 'to'"
      :is-open-from-list="currentWallet === 'from'"
      :to-wallet="wallets.to"
      :from-wallet="wallets.from"
      :class="{ 'swap__form--open-list': isOpenMenu }"
      @openList="openList"
      @submit="submit"
    />
    <swap-wallet-list
      class="swap__wallet-list"
      :class="{ 'swap__wallet-list--open-list': isOpenMenu }"
      @setWallet="setWallet"
    />
  </div>
</template>

<script>
import SwapForm from '@/components/Swap/Form.vue'
import SwapWalletList from '@/components/Swap/WalletList.vue'

export default {
  name: 'Swap',
  components: {
    SwapForm,
    SwapWalletList
  },
  data() {
    return {
      openWalletList: false,
      wallets: {
        to: {},
        from: {}
      },
      currentWallet: null
    }
  },
  computed: {
    queryWallet() {
      return this.$route.query.wallet
    },
    isOpenMenu() {
      return this.currentWallet !== null
    }
  },
  methods: {
    openList(key) {
      this.currentWallet = this.currentWallet === key ? null : key
    },
    setWallet(event) {
      this.wallets[this.currentWallet] = event
      this.currentWallet = null
    },
    submit() {}
  }
}
</script>

<style lang="scss">
.swap {
  position: relative;
  left: 0px;
  width: 100%;
  max-width: 370px;
  height: 100%;
  max-height: 520px;
  margin: 25px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: $--white;
  border-radius: 12px;
  box-shadow: 0px 0px 15px rgba($--black, 0.015);
  overflow-x: hidden;
  overflow-y: auto;
  transition: 0.5s;
  &--open-list {
    left: 152px;
    max-width: 675px;
  }
  @include tablet {
    margin-top: 20px;
    &--open-list {
      left: 0px;
      max-width: 370px;
    }
  }
  @include phone {
    max-width: none;
    width: auto;
    margin: 14px 14px;
  }
  @include small {
    max-height: 415px;
  }
  &__form {
    &--open-list {
      box-shadow: 0px 0px 15px rgba(17, 17, 17, 0.05);
      @include tablet {
        box-shadow: none;
      }
    }
  }
  &__wallet-list {
    z-index: 0;
    @include tablet {
      z-index: 2;
      top: -100%;
      &--open-list {
        top: 0;
      }
    }
  }
}
</style>
