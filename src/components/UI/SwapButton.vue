<template>
  <v-btn class="swap-button" depressed v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: 'SwapButton'
}
</script>

<style lang="scss">
.swap-button {
  text-transform: none;
  letter-spacing: initial;
  font-weight: $--font-weight-semi-bold;

  &:not(.v-btn--round) {
    border-radius: $--main-border-radius;
  }

  &.v-btn.theme--dark.v-btn--has-bg,
  &.v-btn.theme--light.v-btn--has-bg {
    background-color: var(--main-button-background);
  }

  &:not(.v-btn--round).v-size--default {
    height: 42px;
    font-size: $--font-size-button;
  }

  &:not(.v-btn--round).v-size--small {
    height: 31px;
    border-radius: $--border-radius-small;
    padding: 0 10px;
    font-size: $--font-size-base;
  }

  &.v-btn--fab.v-size--small {
    height: 36px;
    width: 36px;
  }

  &:not(.v-btn--round).v-size--large {
    height: 52px;
    font-size: $--font-size-button;
  }
}
</style>
