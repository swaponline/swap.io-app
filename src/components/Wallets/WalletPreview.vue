<template>
  <div class="wallet-preview" v-on="$listeners">
    <coin-logo class="wallet-preview__icon" :path="logo" :name="coin" />

    <div class="wallet-preview__text">
      <span class="wallet-preview__name">{{ name }}</span>
      <span class="wallet-preview__value">{{ coin }} {{ value }}</span>
    </div>
    <div class="wallet-preview__address">{{ minifyAddress(address) }}</div>
  </div>
</template>

<script>
import { minifyAddress } from '@/utils/common'
import CoinLogo from '@/components/Wallets/CoinLogo.vue'

export default {
  name: 'WalletPreview',
  components: { CoinLogo },
  props: {
    coin: { type: String, required: true },
    logo: { type: String, default: '' },
    name: { type: String, default: '' },
    value: { type: [String, Number], default: 0 },
    address: { type: String, required: true }
  },
  methods: { minifyAddress }
}
</script>

<style lang="scss">
.wallet-preview {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px 14px;
  background-color: get-theme-for($background, 'secondary');

  &__icon {
    margin-right: 14px;
    width: 46px;
    height: 46px;
  }
  &__text {
    display: flex;
    align-self: stretch;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
  }
  &__name {
    color: get-theme-for($text, 'primary');
  }
  &__name,
  &__value,
  &__address {
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
  }
  &__value,
  &__address {
    color: $--dark-grey;
  }
  &__address {
    align-self: flex-start;
  }
}
</style>
