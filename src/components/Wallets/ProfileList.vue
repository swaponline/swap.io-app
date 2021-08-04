<template>
  <v-expansion-panels v-model="panels" v-click-outside="closePanels" class="profile-list">
    <v-expansion-panel class="profile-list__inner">
      <v-expansion-panel-header class="profile-list__header" :hide-actions="isDesktop">
        <div class="profile-list__header-wrapper">
          <span class="profile-list__name">{{ currentProfile.username }}</span>
          <v-avatar
            height="25"
            width="21"
            min-width="25"
            class="profile-list__avatar-wrapper"
            :style="`background-image: ${getAvatar(currentProfile)}`"
          >
            <svg-icon name="user" class="profile-list__avatar-icon"></svg-icon>
          </v-avatar>
        </div>
        <svg-icon
          name="arrow"
          :class="['profile-list__arrow-icon', isOpenPanel && 'profile-list__arrow-icon--active']"
        ></svg-icon>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list class="profile-list__list-account py-0">
          <v-list-item
            v-for="profile in restProfiles"
            :key="profile.accountId"
            class="profile-list__list-item"
            @click="setProfile(profile.accountId)"
          >
            <span>{{ profile.username }}</span>
            <v-avatar
              height="25"
              width="25"
              min-width="25"
              class="profile-list__avatar-wrapper"
              :style="`background-image: ${getAvatar(profile)}`"
            >
              <svg-icon name="user" class="profile-list__avatar-icon"></svg-icon>
            </v-avatar>
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
    isOpenPanel() {
      return this.panels === 0
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
    closePanels() {
      this.panels = []
    },
    setProfile(id) {
      this.actionSetProfile(id)
      this.$router.push({ name: 'Wallets', query: null })
      this.closePanels()
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
  height: $--header-height;
  width: 132px;

  @include tablet {
    width: auto;
    margin: 20px 40px;
    z-index: 10;
  }

  @include phone {
    margin: 8px;
  }

  &__inner {
    border-radius: 12px !important;

    &.v-item--active {
      box-shadow: 0 4px 20px rgba(17, 17, 17, 0.1);
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
    padding: 0 8px 0 19px;
    min-height: $--header-height !important;
    background: var(--primary-background);
    transition: $--theme-transition;
    border-radius: 12px;

    @include phone {
      min-height: 70px !important;
    }

    &-wrapper {
      @include tablet {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }

  &__avatar-wrapper {
    flex: 0 !important;
    border-radius: 50% !important;
    position: relative;
    background-size: 100% 100%;

    @include tablet {
      margin-right: 15px;
    }
  }

  &__avatar-icon {
    position: absolute;
    bottom: -4px;
    fill: var(--main-icon-color);
  }

  &__arrow-icon {
    @include only-desktop {
      display: block;
    }

    display: none;
    width: 9px;
    height: 9px;
    fill: var(--main-icon-color);
    transition: $--transition-duration;

    &--active {
      transform: rotate(180deg);
    }
  }

  &__list-account {
    margin: 0 -24px -6px;
    background-color: var(--primary-background) !important;
  }

  &__list-item {
    padding: 0 19px;
    height: 60px;

    @include tablet {
      width: auto;
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
    }

    > span {
      overflow: hidden;
      text-overflow: ellipsis;
      width: 57px;
      margin-right: 3px;

      @include tablet {
        width: auto;
      }
    }
  }

  &__add-new-profile {
    width: 100%;
    border-top: 1px solid var(--main-border-color);
    padding: 16px 10px 15px 10px;
    color: var(--primary-text);
  }

  &__name {
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-medium;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 57px;
    margin-right: 17px;

    @include tablet {
      max-width: inherit;
    }
  }
}
</style>
