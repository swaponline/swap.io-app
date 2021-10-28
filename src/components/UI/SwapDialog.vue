<template>
  <v-dialog content-class="swap-dialog" :value="value" v-bind="$attrs" :overlay-opacity="0.3" v-on="$listeners">
    <div class="swap-dialog__content">
      <slot />
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'SwapDialog',
  props: {
    value: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss">
.swap-dialog {
  height: 600px;
  width: 100%;
  max-width: 412px;
  background: var(--primary-background);
  border-radius: $--border-radius-large;
  padding: 20px;

  @include phone {
    margin: 10px;
  }

  &__content {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}
</style>
