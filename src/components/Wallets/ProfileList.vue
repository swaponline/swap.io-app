<template>
  <v-expansion-panels v-model="panels" v-click-outside="closePanels" :disabled="disabled" class="profile-list">
    <v-expansion-panel class="profile-list__inner">
      <v-expansion-panel-header :hide-actions="isDesktop" class="profile-list__header">
        <div class="profile-list__header-wrapper">
          <v-avatar
            :style="backgroundAvatar"
            class="profile-list__avatar-wrapper"
            height="25"
            min-width="25"
            width="21"
          >
            <svg-icon v-if="!disabled" class="profile-list__avatar-icon" name="user"></svg-icon>
          </v-avatar>
          <span class="profile-list__name">{{ currentProfile.username }}</span>
        </div>
        <svg-icon
          :class="['profile-list__arrow-icon', isOpenPanel && 'profiles-list__arrow-icon--active']"
          name="arrow"
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
              :style="`background-image: ${getAvatar(profile)}`"
              class="profile-list__avatar-wrapper"
              height="25"
              min-width="25"
              width="25"
            >
              <svg-icon class="profile-list__avatar-icon" name="user"></svg-icon>
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
import { events, profilesService } from '@/services/profiles'

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
      currentProfile: profilesService.getCurrentProfile(),
      profiles: profilesService.getProfiles(),
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
      profilesService.setCurrentProfile(id)
      this.closePanels()
    },
    getAvatar({ id }) {
      const { colorScheme } = this.profiles.find(profile => profile.id === id)
      const svgBase64 = `url("data:image/svg+xml;base64,${Base64.encode(colorScheme.background)}")`
      return svgBase64
    },
    subscribeToUpdates() {
      this.subscriptions.push(
        profilesService.subscribe(events.UPDATE_PROFILES, profilesList => {
          this.profiles = profilesList
        })
      )

      this.subscriptions.push(
        profilesService.subscribe(events.UPDATE_CURRENT_PROFILE, profile => {
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
    margin: 0 40px 20px;
    z-index: 10;
  }

  @include phone {
    margin: 0 12px 12px;
  }

  .v-expansion-panel-content__wrap {
    background: get-theme-for($background, 'primary');
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
    background: get-theme-for($background, 'primary');
    transition: $--theme-transition;
    border-radius: 12px;
    display: flex;
    align-items: center;

    &:hover {
      background-color: get-theme-for($background, 'secondary');
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
    fill: get-theme-for($icon, 'active');
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
    fill: get-theme-for($icon, 'active');
    transition: $--transition-duration;

    &--active {
      transform: rotate(180deg);
    }
  }

  &__list-account {
    margin: 0 -24px -6px;
    background-color: get-theme-for($background, 'primary') !important;
  }

  &__list-item {
    padding: 0 14px;
    height: 60px;

    &:hover {
      background-color: get-theme-for($background, 'secondary');
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
    border-top: 1px solid get-theme-for($border-color, 'primary');
    padding: 16px 10px 15px 10px;
    color: get-theme-for($text, 'primary');

    &:hover {
      background-color: get-theme-for($background, 'secondary');
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
