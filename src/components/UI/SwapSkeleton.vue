<template>
  <v-skeleton-loader class="swap-skeleton" v-bind="$attrs" />
</template>

<script>
export default {
  name: 'SwapSkeleton'
}
</script>

<style lang="scss">
.swap-skeleton {
  &.theme--dark.v-skeleton-loader,
  &.theme--light.v-skeleton-loader {
    .v-skeleton-loader__avatar,
    .v-skeleton-loader__button,
    .v-skeleton-loader__chip,
    .v-skeleton-loader__divider,
    .v-skeleton-loader__heading,
    .v-skeleton-loader__image,
    .v-skeleton-loader__text {
      background: var(--main-button-background-hover);
    }
    .v-skeleton-loader__actions,
    .v-skeleton-loader__article,
    .v-skeleton-loader__card-heading,
    .v-skeleton-loader__card-text,
    .v-skeleton-loader__date-picker,
    .v-skeleton-loader__list-item,
    .v-skeleton-loader__list-item-avatar,
    .v-skeleton-loader__list-item-avatar-three-line,
    .v-skeleton-loader__list-item-avatar-two-line,
    .v-skeleton-loader__list-item-text,
    .v-skeleton-loader__list-item-three-line,
    .v-skeleton-loader__list-item-two-line,
    .v-skeleton-loader__table-heading,
    .v-skeleton-loader__table-tbody,
    .v-skeleton-loader__table-tfoot,
    .v-skeleton-loader__table-thead {
      background: transparent;
    }
  }
}
</style>
