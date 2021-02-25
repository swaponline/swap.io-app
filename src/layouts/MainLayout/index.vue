<template>
  <div class="main-layout">
    <main-header class="main-layout__main-header"></main-header>
    <router-view></router-view>
    <match-media v-slot="{ desktop }">
      <main-layout-tabs v-if="!desktop" class="main-layout__tabs"></main-layout-tabs>
    </match-media>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { GET_ACCOUNT_ID } from '@/store/modules/Wallets'

import { MatchMedia } from 'vue-component-media-queries'
import MainHeader from '../components/MainHeader.vue'
import MainLayoutTabs from '../components/Tabs.vue'

export default {
  name: 'MainLayout',
  components: {
    MainHeader,
    MainLayoutTabs,
    MatchMedia
  },
  mounted() {
    this.actionGetAccountId()
  },
  methods: {
    ...mapActions({
      actionGetAccountId: GET_ACCOUNT_ID
    })
  }
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
