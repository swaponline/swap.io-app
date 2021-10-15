<template>
  <div class="settings">
    <h2>Theme</h2>
    <v-radio-group v-model="selectedTheme">
      <v-radio
        v-for="theme in $options.THEMES"
        :key="theme.key"
        :label="theme.text"
        :value="theme.key"
        color="var(--main-color)"
      />
    </v-radio-group>
  </div>
</template>

<script>
import { profilesService } from '@/services/profiles'
import { themeService, THEMES, SYSTEM_THEME_KEY } from '@/services/theme'
import { setAppColorSchemeBasedOnTheme } from '@/utils/appColorScheme'

export default {
  THEMES,
  name: 'Settings',
  data() {
    return {
      selectedTheme: null
    }
  },

  watch: {
    selectedTheme: {
      handler(theme) {
        themeService.setAppTheme(theme)
        const isDark = themeService.getIsDark()

        if (isDark) {
          this.$vuetify.theme.dark = true
        } else {
          this.$vuetify.theme.dark = false
        }
        const currentTheme = themeService.getAppTheme()
        const colorScheme = profilesService.getCurrentProfileColorScheme()

        setAppColorSchemeBasedOnTheme(colorScheme, currentTheme)
      }
    }
  },
  created() {
    const isSystemTheme = themeService.getIsSystemTheme()

    if (isSystemTheme) {
      this.selectedTheme = SYSTEM_THEME_KEY
    } else {
      this.selectedTheme = themeService.getAppTheme()
    }
  }
}
</script>

<style lang="scss">
.settings {
  margin-top: 20px;
  background: var(--primary-background);
  min-height: 400px;
  padding: 40px;
  border-radius: 12px;

  &__theme {
    &-block {
      display: flex;
      align-items: center;

      > span {
        font-size: 16px;
        margin-right: 10px;
      }
    }
  }
}
</style>
