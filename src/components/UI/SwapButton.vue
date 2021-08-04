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
.v-btn {
  background-color: var(--main-button-background-hover) !important;

  &::before {
    opacity: 1 !important;
    background-color: transparent;
  }

  &:hover {
    background-color: var(--main-button-background-hover) !important;

    &::before {
      opacity: 1 !important;
    }
  }
}

.swap-button {
  min-height: 52px;
  min-width: 142px !important;
  border-radius: $--main-border-radius;
  text-transform: none;
  background-color: var(--main-button-background) !important;

  --text-color: $--black;

  &:disabled {
    // обходим vuetify
    &.v-btn.v-btn--depressed.v-btn--disabled {
      ///
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
