<template>
  <div class="swap" :class="{ 'swap--open-list': isOpenMenu }">
    <swap-form
      :is-open-to-list="isOpenToList"
      :is-open-from-list="isOpenFromList"
      :to-wallet="toWallet"
      :from-wallet="fromWallet"
      :class="{ 'swap__form--open-list': isOpenMenu }"
      @openToList="openToList"
      @openFromList="openFromList"
      @submit="submit"
    />
    <swap-wallet-list
      class="swap__wallet-list"
      :class="{ 'swap__wallet-list--open-list': isOpenMenu }"
      :to-wallet="toWallet"
      :from-wallet="fromWallet"
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
      isOpenToList: false,
      isOpenFromList: false,
      fromWallet: {},
      toWallet: {}
    }
  },
  computed: {
    queryWallet() {
      return this.$route.query.wallet
    },
    isOpenMenu() {
      return this.isOpenToList || this.isOpenFromList
    }
  },
  watch: {
    queryWallet: {
      handler() {
        this.openWalletList = false
      }
    }
  },
  methods: {
    openFromList() {
      if (this.isOpenFromList) {
        this.isOpenFromList = false
      } else {
        this.isOpenToList = false
        this.isOpenFromList = true
      }
    },
    openToList() {
      if (this.isOpenToList) {
        this.isOpenToList = false
      } else {
        this.isOpenFromList = false
        this.isOpenToList = true
      }
    },
    setWallet(event) {
      if (this.isOpenFromList) {
        this.fromWallet = event
      } else if (this.isOpenToList) {
        this.toWallet = event
      }
      this.isOpenToList = false
      this.isOpenFromList = false
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
  &__change-wallet {
    display: flex;
    z-index: 3;
    background: $--light-grey !important;
    width: 100%;
    max-width: 370px;
    min-height: 36px;
    border-radius: 0px !important;

    @include phone {
      max-width: none;
    }

    > span {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: $--dark-grey;
      font-weight: $--font-weight-semi-bold;
      font-size: $--font-size-base;
    }
  }
  &__icon-change {
    &--open-list {
      transform: rotate(180deg);
    }
    @include tablet {
      transform: rotate(-90deg);
      &--open-list {
        transform: rotate(90deg);
      }
    }
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
