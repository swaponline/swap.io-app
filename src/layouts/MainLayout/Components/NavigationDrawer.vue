<template>
  <v-navigation-drawer class="navigation-drawer" permanent width="0">
    <v-list dense nav class="navigation-drawer__list">
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="{ name: item.title }"
        active-class="navigation-drawer__list-item--purple"
        link
        color="purple"
        class="navigation-drawer__list-item"
      >
        <v-list-item-icon class="navigation-drawer__list-icon mr-0 mb-4 ml-0">
          <v-icon :class="`navigation-drawer__icon--${item.modificator}`">{{ item.icon }}</v-icon>
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
  min-width: 70px;
  &__list {
    padding: 0 0;
    .navigation-drawer__list-item {
      padding: 0 0;
      justify-content: center;
      width: 100%;
      &--purple {
        color: var(--purple);
      }
    }
  }
  &__list-icon {
    flex-direction: column;
  }
  &__icon {
    &--rotate {
      transform: rotate(45deg);
    }
  }
}
@include tablet {
  .navigation-drawer {
    min-width: 100%;
    position: fixed;
    bottom: 0 !important;
    top: calc(100% - 55px) !important;
    max-height: 55px;
    &__list {
      display: flex;
    }
  }
}
</style>
