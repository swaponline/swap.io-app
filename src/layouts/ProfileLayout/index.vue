<template>
  <div class="profile-layout">
    <main-header class="profile-layout__main-header"></main-header>
    <router-view></router-view>
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'

export default {
  name: 'ProfileLayout',
  components: { MainHeader }
}
</script>

<style lang="scss">
.profile-layout {
  width: 100%;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  padding: 0 20px;

  @include tablet {
    padding: 0;
  }
}
</style>
