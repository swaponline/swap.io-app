<template>
  <div class="page-layout">
    <div class="page-layout__main-block" :class="{ 'page-layout__main-block--hidden': isQueryWallet }">
      <slot name="main-block"></slot>
    </div>
    <div class="page-layout__more-info-block" :class="{ 'page-layout__more-info-block--open': isQueryWallet }">
      <slot name="more-info-block"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PageLayout',
  computed: {
    isQueryWallet() {
      return !!this.$route.query.wallet
    }
  }
}
</script>

<style lang="scss">
.page-layout {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  &__main-block {
    position: relative;
    height: 100%;
    width: 30%;
  }
  &__more-info-block {
    position: relative;
    height: 100%;
    width: 70%;
  }
}
@include tablet {
  .page-layout {
    &__main-block {
      position: absolute;
      width: 100%;
      transition: 0.5s;
      transform: translate(0, 0);
      &--hidden {
        transform: translate(-100%, 0);
      }
    }
    &__more-info-block {
      position: absolute;
      width: 100%;
      transition: 0.5s;
      transform: translate(100%, 0);
      &--open {
        transform: translate(0, 0);
      }
    }
  }
}
</style>
