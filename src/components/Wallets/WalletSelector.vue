<template>
  <v-select
    v-model="localSelectedAddress"
    :items="items"
    return-object
    append-icon=""
    hide-details
    flat
    filled
    item-color
    class="wallet-selector"
    placeholder="Select wallet"
  >
    <template #item="{item}">
      <cryptoicon :symbol="item.currencyName.toLowerCase()" size="32" class="wallet-selector__icon" />
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
import { minifyAddress } from '@/utils/common'

export default {
  name: 'WalletSelector',
  components: { WalletPreview },
  model: {
    prop: 'address',
    event: 'update:address'
  },
  props: {
    address: { type: [Object, String], default: null },
    items: { type: Array, default: () => [] }
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
    background-color: var(--main-input-background) !important;

    &:hover {
      background-color: $--light-grey-5 !important;
    }
    &:before,
    &:after {
      display: none;
    }
  }
  &__icon {
    margin-right: 12px;
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
