<template>
  <form-selector
    v-model="localSelectedAddress"
    :items="items"
    return-object
    label="Your wallet"
    outlined
    class="wallet-selector"
  >
    <template #item="{item}">
      <cryptoicon :symbol="item.currencyName.toLowerCase()" size="32" class="wallet-selector__icon" />
      <span class="wallet-selector__name">{{ item.name }}</span>
      <span class="wallet-selector__address">{{ minifyAddress(item.address) }}</span>
    </template>

    <template #selection="{item}">
      <cryptoicon :symbol="item.currencyName.toLowerCase()" size="32" class="wallet-selector__icon" />
      <span class="wallet-selector__name">{{ item.name }}</span>
      <span class="wallet-selector__address">{{ minifyAddress(item.address) }}</span>
    </template>
  </form-selector>
</template>

<script>
import FormSelector from '@/components/UI/Forms/Selector.vue'
import { minifyAddress } from '@/utils/common'

export default {
  name: 'WalletSelector',
  components: { FormSelector },
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
  &__icon {
    margin-right: 12px;
  }
  &__name {
    font-weight: 600;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 8px;
  }
}
</style>
