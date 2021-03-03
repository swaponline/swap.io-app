<template>
  <div class="swap" :class="openWalletList ? 'swap--with-list' : ''">
    <swap-button class="swap__change-wallet" @click="openWalletList = !openWalletList">
      <v-icon class="swap__icon-change" :class="openWalletList ? 'swap__icon-change--with-list' : ''"
        >mdi-chevron-left</v-icon
      >
      change wallet
    </swap-button>
    <swap-form />
    <swap-wallet-list />
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
  transform-origin: left center;
  transition: 0.5s;
  @include only-desktop {
    &--with-list {
      right: 152px;
      max-width: 675px;
    }
  }
  @include tablet {
    max-width: 370px;
  }
  @include phone {
    margin: 14px 14px;
  }
  &__change-wallet {
    z-index: 2;
    background: $--light-grey !important;
    width: 100%;
    max-width: 370px;
    min-height: 36px;
    border-radius: 0px !important;
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
    &--with-list {
      transform: rotate(180deg);
    }
    @include phone {
      transform: rotate(-90deg);
      &--with-list {
        transform: rotate(90deg);
      }
    }
  }
}
</style>
