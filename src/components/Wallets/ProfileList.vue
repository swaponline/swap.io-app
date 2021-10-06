<template>
  <v-expansion-panels v-model="panels" v-click-outside="closePanels" :disabled="disabled" class="profile-list">
    <v-expansion-panel class="profile-list__inner">
      <v-expansion-panel-header class="profile-list__header" :hide-actions="isDesktop">
        <div class="profile-list__header-wrapper">
          <v-avatar
            height="25"
            width="21"
            min-width="25"
            class="profile-list__avatar-wrapper"
            :style="backgroundAvatar"
          >
            <svg-icon v-if="!disabled" name="user" class="profile-list__avatar-icon"></svg-icon>
          </v-avatar>
          <span class="profile-list__name">{{ currentProfile.username }}</span>
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
            @click="setProfile(profile.id)"
          >
            <v-avatar
              height="25"
              width="25"
              min-width="25"
              class="profile-list__avatar-wrapper"
              :style="`background-image: ${getAvatar(profile)}`"
            >
              <svg-icon name="user" class="profile-list__avatar-icon"></svg-icon>
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
import { Base64 } from 'js-base64'
import { profileService, UPDATE_CURRENT_PROFILE, UPDATE_PROFILES } from '@/services/profile'

const BACKGROUND_COLOR_AVATAR_FOR_DISABLED = '#919191'

export default {
  name: 'ProfileList',
  inject: ['mediaQueries'],
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      panels: [],
      currentProfile: profileService.currentProfile(),
      profiles: profileService.profiles(),
      subscriptions: []
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
    restProfiles() {
      return this.profiles.filter(profile => profile.id !== this.currentProfile.id)
    },
    backgroundAvatar() {
      if (this.disabled) return `background-color: ${BACKGROUND_COLOR_AVATAR_FOR_DISABLED}`

      return `background-image: ${this.getAvatar(this.currentProfile)}`
    }
  },
  mounted() {
    this.subscribeToUpdates()
  },
  beforeDestroy() {
    this.subscriptions.forEach(callback => callback.unsubscribe())
  },
  methods: {
    closePanels() {
      this.panels = []
    },
    setProfile(id) {
      profileService.setCurrentProfile(id)
      this.closePanels()
    },
    getAvatar({ id }) {
      const { colorScheme } = this.profiles.find(profile => profile.id === id)
      const svgBase64 = `url("data:image/svg+xml;base64,${Base64.encode(colorScheme.background)}")`
      return svgBase64
    },
    subscribeToUpdates() {
      this.subscriptions.push(
        profileService.subscribe(UPDATE_PROFILES, profilesList => {
          this.profiles = profilesList
        })
      )

      this.subscriptions.push(
        profileService.subscribe(UPDATE_CURRENT_PROFILE, profile => {
          this.currentProfile = profile
        })
      )
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
  width: 160px;

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
    padding: 0 12px 0 12px;
    min-height: $--header-height !important;
    background: var(--primary-background);
    transition: $--theme-transition;
    border-radius: 12px;
    display: flex;
    align-items: center;

    &:hover {
      background-color: var(--main-input-background);
    }

    @include phone {
      min-height: 70px !important;
    }

    &-wrapper {
      display: flex;
      align-items: center;
      overflow: hidden;
      flex: 1 0 100%;
      padding-right: 8px;
    }
  }

  &__avatar-wrapper {
    flex: 0 !important;
    border-radius: 50% !important;
    position: relative;
    background-size: 100% 100%;
    margin-right: 10px;

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
    flex-grow: 0 !important;
    flex-shrink: 0 !important;
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
    padding: 0 14px;
    height: 60px;

    &:hover {
      background-color: var(--main-input-background);
    }

    @include tablet {
      width: auto;
    }

    > span {
      overflow: hidden;
      text-overflow: ellipsis;

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
    &:hover {
      background-color: var(--main-input-background);
    }
  }

  &__name {
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-medium;
    overflow: hidden;
    text-overflow: ellipsis;

    @include tablet {
      max-width: inherit;
    }
  }
}
</style>
