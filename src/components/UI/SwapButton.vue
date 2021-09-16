<template>
  <v-btn
    class="swap-button"
    :class="{ 'swap-button--theme-primary': primary }"
    depressed
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: 'SwapButton',
  props: {
    primary: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss">
.swap-button {
  text-transform: none;
  letter-spacing: initial;
  font-weight: $--font-weight-semi-bold;

  &.theme--dark.v-btn:hover:before,
  &.theme--light.v-btn:hover:before {
    opacity: 1;
  }

  &.v-btn::before {
    background-color: var(--main-button-background-hover);
  }

  &:not(.v-btn--round):not(.v-btn--tile) {
    border-radius: $--main-border-radius;
  }

  &.v-btn.theme--dark.v-btn--has-bg,
  &.v-btn.theme--light.v-btn--has-bg {
    background-color: var(--main-button-background);
  }

  &--theme-primary {
    color: $--white !important;
    background-color: var(--main-color) !important;
    &.v-btn::before {
      background-color: rgba($--black, 0.15);
    }
  }

  &:not(.v-btn--round).v-size--default {
    height: $--button-size-default;
    font-size: $--font-size-button;
  }

  &:not(.v-btn--round).v-size--small {
    height: $--button-size-small;

    padding: 0 10px;
    font-size: $--font-size-base;

    &:not(.v-btn--tile) {
      border-radius: $--border-radius-small;
    }
  }

  &.v-btn--fab.v-size--small {
    height: $--button-size-fab-small;
    width: $--button-size-fab-small;
  }

  &:not(.v-btn--round).v-size--large {
    height: $--button-size-large;
    font-size: $--font-size-button;
  }
}
</style>
