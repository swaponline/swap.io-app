<template>
  <transition name="translate">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'RightTranslate',
  props: {
    reverse: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.translate-enter-to.translate-leave-from {
  transform: translateX(0);
}
.translate-enter-active,
.translate-leave-active {
  transition: 0.5s;
}
.translate-enter,
.translate-leave-to {
  transform: translateX(100vw);
}
</style>
