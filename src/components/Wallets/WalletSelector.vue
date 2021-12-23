<template>
  <v-select
    v-model="localSelectedAddress"
    :items="items"
    :readonly="readonly"
    return-object
    append-icon=""
    hide-details
    flat
    filled
    item-color
    class="wallet-selector"
    placeholder="Select wallet"
    :menu-props="{ 'content-class': 'wallet-selector__menu' }"
  >
    <template #item="{item}">
      <coin-logo class="wallet-selector__icon" :path="item.logo" :name="item.coin" />
      <span class="wallet-selector__short-name">{{ item.name }} ({{ item.value }})</span>
      <span class="wallet-selector__short-address">{{ minifyAddress(item.address) }}</span>
    </template>

    <template #selection="{item}">
      <wallet-preview v-bind="item" />
    </template>
  </v-select>
</template>

<script>
import WalletPreview from '@/components/Wallets/WalletPreview.vue'
import CoinLogo from '@/components/Wallets/CoinLogo.vue'
import { minifyAddress } from '@/utils/common'

export default {
  name: 'WalletSelector',
  components: { WalletPreview, CoinLogo },
  model: {
    prop: 'address',
    event: 'update:address'
  },
  props: {
    address: { type: [Object, String], default: null },
    items: { type: Array, default: () => [] },
    readonly: { type: Boolean, default: false }
  },
  computed: {
    localSelectedAddress: {
      get() {
        return this.address
      },
      set(value) {
        this.$emit('update:address', value)
      }
    }
  },
  methods: {
    minifyAddress
  }
}
</script>

<style lang="scss">
.wallet-selector {
  border-radius: $--main-border-radius;

  .v-select__selections {
    input::placeholder {
      font-size: 1.15em;
      padding: 0 20px;
    }
  }
  .v-input__slot {
    height: 74px;
    padding: 0 !important;
    background-color: get-theme-for($background, 'secondary') !important;

    &:hover {
      .wallet-preview {
        background-color: get-theme-for($button, 'primary', 'hover') !important;
      }
    }
    &:before,
    &:after {
      display: none;
    }
  }
  &__icon {
    margin-right: 12px;
    width: 32px;
    height: 32px;
  }

  &__menu {
    .v-list-item:hover {
      background-color: get-theme-for($button, 'primary', 'hover');
    }
  }

  &__short-name {
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 8px;
  }
  &__short-address {
    margin-left: auto;
  }
}
</style>
