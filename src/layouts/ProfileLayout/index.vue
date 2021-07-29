<template>
  <div class="profile-layout">
    <main-header class="profile-layout__main-header"></main-header>
    <substrate>
      <router-view></router-view>
    </substrate>
  </div>
</template>

<script>
import Substrate from '@/components/Profile/Substrate.vue'
import MainHeader from '../components/MainHeader.vue'

export default {
  name: 'MainLayout',
  components: { MainHeader, Substrate }
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
}
</style>
