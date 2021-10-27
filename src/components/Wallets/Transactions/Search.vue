<template>
  <div class="transactions-search">
    <v-text-field
      v-model="localValue"
      hide-details
      dense
      prepend-icon="mdi-magnify"
      placeholder="Search transactions"
      class="transactions-search__input"
      aria-autocomplete="false"
    />
  </div>
</template>

<script>
export default {
  name: 'TransactionsSearch',
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
.transactions-search {
  background-color: get-theme-for($background, 'secondary');
  padding: 5px 22px;

  &__input {
    margin-top: 0;
    font-size: 14px;
    align-items: center !important;

    input {
      padding: 0 !important;
    }
    .v-icon {
      font-size: $--font-size-extra-small-subtitle !important;
    }
    .v-input__slot {
      &:before,
      &:after {
        display: none;
      }
    }
  }
  .v-input--is-focused {
    .v-icon {
      color: var(--main-color) !important;
    }
  }
}
</style>
