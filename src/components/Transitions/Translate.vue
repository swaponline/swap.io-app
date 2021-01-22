<template>
  <transition :name="reverse ? 'translate-reverse' : 'translate'">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'Translate',
  props: {
    reverse: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.translate {
  &-enter-to,
  &-leave-from {
    transform: translateX(0);
  }
  &-enter-active,
  &-leave-active {
    transition: 0.5s;
  }
  &-enter {
    position: absolute !important;
    transform: translateX(100vw);
    opacity: 0;
  }
  &-leave-to {
    position: absolute !important;
    transform: translateX(-100vw);
    opacity: 0;
  }
}
.translate-reverse {
  &-enter-to,
  &-leave-from {
    transform: translateX(0);
  }
  &-enter-active,
  &-leave-active {
    transition: 0.5s;
  }
  &-enter {
    position: absolute !important;
    transform: translateX(-100vw);
    opacity: 0;
  }
  &-leave-to {
    position: absolute !important;
    transform: translateX(100vw);
    opacity: 0;
  }
}
</style>
