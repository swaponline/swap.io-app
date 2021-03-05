<template>
  <div class="swap" :class="{ 'swap--open-list': openWalletList }">
    <swap-button class="swap__change-wallet" @click="openWalletList = !openWalletList">
      <v-icon class="swap__icon-change" :class="{ 'swap__icon-change--open-list': openWalletList }"
        >mdi-chevron-left</v-icon
      >
      change wallet
    </swap-button>
    <swap-form @submit="submit" />
    <swap-wallet-list class="swap__wallet-list" :class="{ 'swap__wallet-list--open-list': openWalletList }" />
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
      openWalletList: false
    }
  },
  computed: {
    queryWallet() {
      return this.$route.query.wallet
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
    submit() {}
  }
}
</script>

<style lang="scss">
.swap {
  position: relative;
  right: 0px;
  width: 100%;
  max-width: 370px;
  height: 100%;
  max-height: 520px;
  margin: 25px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: $--white;
  border-radius: 12px;
  box-shadow: 0px 0px 15px rgba($--black, 0.015);
  overflow-x: hidden;
  overflow-y: auto;
  transition: 0.5s;
  &--open-list {
    right: 152px;
    max-width: 675px;
  }
  @include tablet {
    margin-top: 20px;
    &--open-list {
      right: 0px;
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
  &__wallet-list {
    z-index: 0;
    @include tablet {
      z-index: 2;
      top: -100%;
      &--open-list {
        top: 36px;
      }
    }
  }
}
</style>
