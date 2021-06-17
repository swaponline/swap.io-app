<template>
  <div class="main-layout">
    <main-header class="main-layout__main-header"></main-header>
    <router-view></router-view>
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'

export default {
  name: 'MainLayout',
  components: { MainHeader }
}
</script>

<style lang="scss">
.main-layout {
  width: 100%;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &__tabs {
    display: none;
    @include tablet {
      display: block;
      flex-grow: 0;
    }
  }
}
</style>
