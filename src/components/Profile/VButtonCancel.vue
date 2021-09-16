<template>
  <button class="button-cancel" v-bind="$attrs" v-on="$listeners">
    <span>
      <svg-icon aria-label="Cancel creation" name="cross" class="button-cancel__i-cross" />
    </span>
  </button>
</template>

<style lang="scss">
.button-cancel {
  width: 44px;
  height: 44px;

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    opacity: 0;
    background-color: $--light-grey;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }

  &__i-cross {
    width: 22px;
    height: 22px;
    z-index: 100;
  }
}
</style>
