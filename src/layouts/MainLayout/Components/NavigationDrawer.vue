<template>
  <v-navigation-drawer class="navigation-drawer" permanent touchless width="0">
    <v-list dense nav class="navigation-drawer__list">
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="{ name: item.title }"
        active-class="navigation-drawer__list-item--purple"
        link
        color="purple"
        class="navigation-drawer__list-item pb-2 mb-0"
      >
        <v-list-item-icon class="navigation-drawer__list-icon mr-0 mb-4 ml-0">
          <v-icon class="navigation-drawer__icon" :class="`navigation-drawer__icon--${item.modificator}`">{{
            item.icon
          }}</v-icon>
          {{ item.title }}
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  data() {
    return {
      items: [
        { title: 'Wallets', icon: 'mdi-wallet' },
        { title: 'Swap', icon: 'mdi-swap-vertical', modificator: 'rotate' },
        { title: 'History', icon: 'mdi-history' },
        { title: 'Settings', icon: 'mdi-settings' }
      ]
    }
  }
}
</script>

<style lang="scss">
.navigation-drawer {
  position: relative;
  min-width: var(--navigation-drawer-desktop-width);
  z-index: 9999;
  &__list {
    padding: 0 0;
    .navigation-drawer__list-item {
      padding: 0 0;
      justify-content: center;
      width: 100%;
      &--purple {
        color: var(--purple);
      }
      &:before {
        border-radius: 0px;
      }
    }
  }
  &__list-icon {
    flex-direction: column;
  }
  &__icon {
    min-height: 24px;
    &--rotate {
      transform: rotate(45deg);
    }
  }
}
@include tablet {
  .navigation-drawer {
    min-width: 100%;
    position: fixed;
    top: calc(100% - var(--navigation-drawer-mobile-height)) !important;
    border-top: 1px solid $--grey;
    max-height: var(--navigation-drawer-mobile-height);
    &__list {
      display: flex;
    }
  }
}
</style>
