<template>
  <v-list
    class="wallets-menu purple"
    :class="{
      'wallets-menu--open-menu': visible,
      'wallets-menu--await': awaitStatus
    }"
  >
    <v-list-item v-for="i in 5" :key="i">
      <slot :info="i"> item {{ i }} </slot>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'WalletsMenu',
  props: {
    list: {
      type: Array,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    awaitStatus: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.wallets-menu {
  border-top: 1px solid $--grey;
  overflow: hidden;
  width: 100%;
  color: $--white;
  position: absolute;
  left: 0;
  top: 0;
  transition: 0.5s;
  white-space: nowrap;
  &--open-menu {
    opacity: 0.85;
    transform: translate(0, 0);
    z-index: 2;
  }
  &--await {
    transform: translate(100%, 0);
  }
}
@include tablet {
  .wallets-menu {
    transform: translate(0, -100%);
    &--open-menu {
      opacity: 0.85;
      transform: translate(0, 0);
      z-index: 2;
    }
    &--await {
      transform: translate(0, -100%);
    }
  }
}
</style>
