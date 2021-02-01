<template>
  <v-dialog
    :value="value"
    v-bind="$attrs"
    content-class="form-wrapper"
    transition="slide-x-reverse-transition"
    v-on="$listeners"
  >
    <slot></slot>
  </v-dialog>
</template>

<script>
export default {
  name: 'FormWrapper',
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.form-wrapper {
  position: relative;
  height: 100%;
  max-height: calc(var(--vh, 1vh) * 100) !important;
  width: 40%;
  margin-left: auto;
  border-radius: 0;
  overflow: auto;
  background: $--white;
  margin-right: 0;
  @include tablet {
    width: 100%;
  }
}
</style>
