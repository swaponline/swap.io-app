<template>
  <swap-copy-wrapper>
    <template #default="{ copy, tooltipOn }">
      <button
        v-ripple="{ center: true }"
        class="swap-copy-button"
        :class="{ 'swap-copy-button--size-small': small }"
        type="button"
        v-on="tooltipOn"
        @click="copy(value)"
      >
        <slot>
          {{ label }}
        </slot>
        <slot name="icon">
          <svg-icon class="swap-copy-button__icon" name="copy" />
        </slot>
      </button>
    </template>
  </swap-copy-wrapper>
</template>

<script>
export default {
  name: 'SwapCopyButton',
  props: {
    value: { type: String, default: '' },
    label: { type: String, default: '' },
    small: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss">
.swap-copy-button {
  $this: &;

  display: flex;
  align-items: flex-start;
  padding: 4px;
  word-break: break-all;
  text-align: left;
  transition: 0.3s;
  max-width: 100%;

  &:hover {
    background: get-theme-for($button, 'primary', 'hover');
  }

  &--size-small {
    #{$this}__icon {
      width: 11px;
      height: 11px;
    }
  }

  &__icon {
    flex-shrink: 0;
    margin-left: 10px;
    width: 16px;
    height: 16px;
  }
}
</style>
