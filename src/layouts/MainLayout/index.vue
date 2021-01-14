<template>
  <div class="main-layout">
    <v-toolbar color="purple" flat class="main-layout__header" height="auto"></v-toolbar>
    <div class="main-layout__page">
      <navigation-drawer class="main-layout__navbar"></navigation-drawer>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavigationDrawer from './Components/NavigationDrawer.vue'

export default {
  name: 'MainLayout',
  components: {
    NavigationDrawer
  }
}
</script>

<style lang="scss">
.main-layout {
  min-height: calc(var(--vh, 1vh) * 100);
  &__header {
    min-height: 40px;
  }
  &__page {
    display: flex;
    height: calc(var(--vh, 1vh) * 100 - 40px);
    max-width: $--max-content-size;
    margin: auto;
  }
}
@include tablet {
  .main-layout {
    min-height: calc(var(--vh, 1vh) * 100 - var(--navigation-drawer-mobile-height));
    &__page {
      flex-direction: column;
    }
    &__navbar {
      order: 2;
    }
  }
}
</style>
