<template>
  <div class="transition-inner">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TransitionInner'
}
</script>

<style lang="scss">
.transition-inner {
  position: absolute;
  z-index: $--z-index-high;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background: $--white;
  @include tablet {
    width: 100%;
    max-width: 100vw;
  }
}
</style>
