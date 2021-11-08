<template>
  <v-dialog
    :content-class="`${classes} ${contentClass}`"
    :value="value"
    v-bind="$attrs"
    :transition="transition"
    :overlay-opacity="0.3"
    v-on="$listeners"
  >
    <div class="swap-dialog__content">
      <slot />
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'SwapDialog',
  props: {
    value: { type: Boolean, default: false },
    contentClass: { type: String, default: '' },
    center: { type: Boolean, default: false }
  },
  computed: {
    classes() {
      const baseClass = 'swap-dialog'
      const centerClass = this.center ? `${baseClass}--center` : ''
      return `${baseClass} ${centerClass}`
    },

    transition() {
      return this.center ? 'dialog-transition' : 'slide-x-reverse-transition'
    }
  }
}
</script>

<style lang="scss">
.swap-dialog {
  height: 100%;
  width: 40%;
  max-width: 650px;
  border-radius: 0;
  overflow: auto;
  background: var(--primary-background);
  margin-left: auto;
  margin-right: 0;
  padding: 40px;
  box-shadow: none;

  &.v-dialog:not(.v-dialog--fullscreen) {
    max-height: 100%;
  }

  @include tablet {
    width: 100%;
  }

  @include phone {
    padding: 25px 20px;
  }

  &--center {
    width: 100%;
    max-width: 412px;
    height: 600px;
    border-radius: $--border-radius-large;
    padding: 20px;
    margin: 10px;

    @include phone {
      padding: 20px 15px 15px;
    }
  }

  &__content {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}
</style>
