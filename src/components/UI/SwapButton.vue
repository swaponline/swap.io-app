<template>
  <v-btn class="swap-button" depressed v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: 'SwapButton',
  inheritAttrs: false
}
</script>

<style lang="scss">
.swap-button {
  min-height: 52px;
  min-width: 142px !important;
  border-radius: 8px;
  text-transform: none;

  --text-color: $--black;
  &:disabled {
    // обходим vuetify
    &.v-btn.v-btn--depressed.v-btn--disabled.theme--light {
      background-color: $--light-grey !important;
    }
    --text-color: $--dark-grey;
  }
  > span {
    color: var(--text-color);
    font-weight: $--font-weight-bold;
    font-size: $--font-size-button;
  }
  @include phone {
    width: 100%;
    min-height: 45px;
    > span {
      font-weight: $--font-weight-bold;
      font-size: $--font-size-medium;
    }
  }
}
</style>
