<template>
  <v-list-item class="wallet-search">
    <v-list-item-content>
      <v-text-field
        v-model="localValue"
        hide-details
        dense
        placeholder="Search"
        class="wallet-search__input"
        aria-autocomplete="false"
      />
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
  background-color: get-theme-for($background, 'secondary');
  padding: 0 25px;

  .v-list-item__content {
    padding: 8px 0 12px;
  }

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
