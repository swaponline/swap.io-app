<template>
  <v-list-item class="wallet-search">
    <v-list-item-content>
      <v-text-field v-model="localValue" hide-details dense placeholder="Search" class="wallet-search__input" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'WalletSearch',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    value: { type: String, required: true }
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('update:value', val)
      }
    }
  }
}
</script>

<style lang="scss">
.wallet-search {
  background-color: $--light-grey;
  padding: 1px 25px 5px;

  &__input {
    font-size: 18px;

    .v-input__slot {
      &:before,
      &:after {
        display: none;
      }
    }
  }
}
</style>
