<template>
  <button class="button-back" v-bind="$attrs" v-on="$listeners">
    <span>
      <svg-icon aria-label="Go back" class="button-back__i-back" name="i_back"></svg-icon>
    </span>
  </button>
</template>

<style lang="scss">
.button-back {
  width: 44px;
  height: 44px;
  margin-left: -17px;
  position: relative;
  flex: 1 0 auto;

  @include phone {
    width: 38px;
    height: 38px;
    margin-left: -13px;
  }

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

  &__i-back {
    width: 24px;
    height: 24px;
    z-index: 100;
  }
}
</style>
