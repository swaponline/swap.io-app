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
import { setCSSCustomProperty } from '@/utils/common'

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

        const { color, colorForDarkTheme } = this.getCurrentUserTheme()

        let appTheme = theme
        if (theme === SYSTEM_THEME_KEY) {
          appTheme = getUserSystemTheme()
        }

        if (appTheme === LIGHT_THEME_KEY) {
          this.$vuetify.theme.light = true
          this.$vuetify.theme.dark = false
          setCSSCustomProperty('main-color', color)
        }

        if (appTheme === DARK_THEME_KEY) {
          this.$vuetify.theme.dark = true
          this.$vuetify.theme.light = false
          setCSSCustomProperty('main-color', colorForDarkTheme)
        }
      }
    }
  },
  created() {
    this.selectedTheme = getStorage(THEME_KEY) || SYSTEM_THEME_KEY
  },

  methods: {
    getCurrentUserTheme() {
      const usersThemes = getStorage('usersThemes')
      const currentAccountId = getStorage('currentAccount')

      return usersThemes.filter(userTheme => userTheme.accountId === currentAccountId)[0]
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
