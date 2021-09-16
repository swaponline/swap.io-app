<template>
  <swap-button icon large class="button-back" v-bind="$attrs" v-on="$listeners">
    <svg-icon aria-label="Go back" class="button-back__i-back" name="i_back"></svg-icon>
  </swap-button>
</template>

<style lang="scss">
.button-back {
  &__i-back {
    width: 24px;
    height: 24px;
    z-index: 100;
  }
}
</style>
