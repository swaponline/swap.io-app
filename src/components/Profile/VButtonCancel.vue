<template>
  <swap-button icon large class="button-cancel" v-bind="$attrs" v-on="$listeners">
    <svg-icon aria-label="Cancel creation" name="cross" class="button-cancel__i-cross" />
  </swap-button>
</template>

<style lang="scss">
.button-cancel {
  &__i-cross {
    width: 22px;
    height: 22px;
    z-index: 100;
    color: get-theme-for($text, 'primary');
  }
}
</style>
