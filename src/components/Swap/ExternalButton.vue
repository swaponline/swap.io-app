<template>
  <v-list-item class="swap-external-button" @click="$emit('openExternalForm')">
    <v-list-item-icon class="swap-external-button__icon-wrapper">
      <svg-icon
        name="external"
        class="swap-external-button__icon"
        :class="{ 'swap-external-button__icon--is-open-form': isOpenExternalForm }"
      />
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title class="swap-external-button__title">
        <span class>External wallet</span>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'SwapExternalButton',
  props: {
    isOpenExternalForm: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.swap-external-button {
  width: 100%;
  min-height: 40px;
  border-radius: 12px;
  margin: 5px 10px;
  padding: 0 15px;
  overflow: hidden;
  &:hover {
    background: #f7f7f7;
  }
  &:first-child {
    margin-top: 5px;
  }
  &::before {
    display: none;
    z-index: 0;
    background: $--black;
  }
  @include tablet {
    margin: 5px 25px;
  }
  @include small {
    margin: 5px 0;
  }
  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    min-width: 45px;
    height: 45px;
    margin: 15px 14px 15px 0 !important;
  }
  &__icon {
    width: 45px;
    height: 45px;
    fill: $--white;
    transition: 0.3s;
    &--is-open-form {
      transform: rotate(45deg);
    }
  }
  &__title {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    line-height: 25px !important;
    letter-spacing: 0.01em;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
  }
}
</style>
