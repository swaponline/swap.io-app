<template>
  <v-expansion-panels v-model="panels" class="profile-list">
    <v-expansion-panel class="profile-list__inner">
      <v-expansion-panel-header class="profile-list__header" :hide-actions="isDesktop">
        <v-avatar
          height="50"
          width="50"
          min-width="50"
          class="profile-list__avatar-wrapper"
          :style="`background-image: ${getAvatar(currentProfile)}`"
        >
          <v-icon size="60" class="profile-list__avatar-icon">mdi-account-circle</v-icon>
        </v-avatar>
        <span class="profile-list__name">{{ currentProfile.username }}</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list class="profile-list__list-account py-0">
          <v-list-item
            v-for="profile in restProfiles"
            :key="profile.accountId"
            class="profile-list__list-item"
            @click="setProfile(profile.accountId)"
          >
            <v-avatar
              height="50"
              width="50"
              min-width="50"
              class="profile-list__avatar-wrapper"
              :style="`background-image: ${getAvatar(profile)}`"
            >
              <v-icon size="60" class="profile-list__avatar-icon">mdi-account-circle</v-icon>
            </v-avatar>
            <span>{{ profile.username }}</span>
          </v-list-item>
          <button class="profile-list__add-new-profile" @click="toSecurityInfo">+ Add profile</button>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapActions } from 'vuex'
import { MODULE_PROFILE, SET_PROFILE } from '@/store/modules/Profile'
import { Base64 } from 'js-base64'

export default {
  name: 'ProfileList',
  inject: ['mediaQueries'],
  data() {
    return {
      panels: []
    }
  },
  computed: {
    isDesktop() {
      return this.mediaQueries.desktop
    },
    balance() {
      return this.$store.getters.accountBalance
    },
    module() {
      return this.$store.state[MODULE_PROFILE]
    },
    profiles() {
      return this.module.profiles
    },
    currentProfile() {
      return this.module.model.profile
    },
    restProfiles() {
      return this.profiles.filter(p => p.accountId !== this.currentProfile.accountId)
    }
  },
  methods: {
    ...mapActions({
      actionSetProfile: SET_PROFILE
    }),
    setProfile(id) {
      this.actionSetProfile(id)
      this.$router.push({ name: 'Wallets', query: null })
      this.panels = []
    },
    getAvatar({ accountId }) {
      const { background } = this.profiles.find(p => p.accountId === accountId)
      const svgBase64 = `url("data:image/svg+xml;base64,${Base64.encode(background)}")`
      return svgBase64
    },
    toSecurityInfo() {
      return this.$router.push({ name: 'SecurityInfo' })
    }
  }
}
</script>

<style lang="scss">
.profile-list {
  display: flex;
  overflow: visible;
  height: 80px;
  min-width: 200px;

  @include tablet {
    width: auto;
    margin: 20px 40px;
    z-index: 10;
  }
  @include phone {
    height: 70px;
    margin: 8px;
  }
  &__inner {
    border-radius: 12px !important;
    &.v-item--active {
      box-shadow: 0px 4px 20px rgba(17, 17, 17, 0.1);
    }
    &::before {
      display: none;
      @include tablet {
        display: block;
      }
    }
  }
  &__header {
    margin: 0;
    padding: 0 25px;
    min-height: 80px !important;
    background: $--white;
    border-radius: 12px;
    @include phone {
      min-height: 70px !important;
    }
  }
  &__avatar-wrapper {
    margin-right: 12px;
    flex: 0 !important;
    border-radius: 50% !important;
    position: relative;
  }
  &__avatar-icon {
    color: white !important;
    opacity: 0.6;
  }
  &__list-account {
    margin: 0 -24px -6px;
  }
  &__list-item {
    padding: 0 25px;
    height: 80px;
  }
  &__add-new-profile {
    width: 100%;
    border-top: 1px solid #f6f6f6;
    padding: 16px 32px 15px 25px;
    color: $--black;
  }
  &__name {
    font-weight: $--font-weight-medium;
    font-size: $--font-size-extra-small-subtitle;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
