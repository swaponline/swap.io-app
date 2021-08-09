<template>
  <div class="settings">
    <h2>Theme</h2>
    <v-radio-group v-model="selectedTheme">
      <v-radio
        v-for="theme in $options.THEMES"
        :key="theme.key"
        color="var(--main-color)"
        :label="theme.text"
        :value="theme.key"
      />
    </v-radio-group>
  </div>
</template>

<script>
import { getStorage, setStorage } from '@/utils/storage'
import { THEMES, THEME_KEY, SYSTEM_THEME_KEY, LIGHT_THEME_KEY, DARK_THEME_KEY } from '@/constants/theme'
import { getUserSystemTheme } from '@/utils/theme'

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
        setStorage(THEME_KEY, theme)

        let appTheme = theme
        if (theme === SYSTEM_THEME_KEY) {
          appTheme = getUserSystemTheme()
        }

        if (appTheme === LIGHT_THEME_KEY) {
          this.$vuetify.theme.light = true
          this.$vuetify.theme.dark = false
        }
        if (appTheme === DARK_THEME_KEY) {
          this.$vuetify.theme.dark = true
          this.$vuetify.theme.light = false
        }
      }
    }
  },
  created() {
    this.selectedTheme = getStorage(THEME_KEY) || LIGHT_THEME_KEY
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
