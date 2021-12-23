<template>
  <v-skeleton-loader class="swap-skeleton" v-bind="$attrs" />
</template>

<script>
export default {
  name: 'SwapSkeleton',
  inheritAttrs: false
}
</script>

<style lang="scss">
.swap-skeleton {
  &.theme--dark,
  &.theme--light {
    .v-skeleton-loader {
      &__avatar,
      &__button,
      &__chip,
      &__divider,
      &__heading,
      &__image,
      &__text {
        background: get-theme-for($button, 'primary', 'hover');
      }

      &__actions,
      &__article,
      &__card-heading,
      &__card-text,
      &__date-picker,
      &__list-item,
      &__list-item-avatar,
      &__list-item-avatar-three-line,
      &__list-item-avatar-two-line,
      &__list-item-text,
      &__list-item-three-line,
      &__list-item-two-line,
      &__table-heading,
      &__table-tbody,
      &__table-tfoot,
      &__table-thead {
        background: transparent;
      }
    }
  }
}
</style>
