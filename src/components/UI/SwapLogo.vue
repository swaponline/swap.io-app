<template>
  <div class="swap-logo">
    <svg-icon class="swap-logo__logo-icon" name="logo" />
    <h2 class="swap-logo__logo-text">Swap.io</h2>
  </div>
</template>

<script>
export default {
  name: 'SwapLogo'
}
</script>

<style lang="scss">
.swap-logo {
  display: flex;
  align-items: center;

  @include tablet {
    min-width: 0;
    flex-grow: 1;
  }

  &__logo-icon {
    width: 42px;
    height: 39px;
    margin-right: 20px;
    fill: var(--main-color);

    @include tablet {
      width: 42px;
      height: 39px;
    }

    @include small-phone {
      margin-right: 15px;
      width: 30px;
      height: 30px;
    }
  }

  &__logo-text {
    text-decoration: none;
    color: get-theme-for($text, 'primary');
    font-size: $--font-size-extra-small-subtitle;
  }
}
</style>
