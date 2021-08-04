<template>
  <div class="settings">
    <h1>Theme</h1>
    <v-radio-group v-model="selectTheme">
      <v-radio v-for="(theme, index) in themes" :key="index" :label="theme" :value="theme"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
const THEMES = ['dark', 'light', 'As in the system']

export default {
  THEMES,
  name: 'Settings',
  data() {
    return {
      selectTheme: 'dark',
      themes: ['dark', 'light', 'As in the system']
    }
  },
  computed: {
    darkThemeBasedOnUserSystem() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    },
    lightThemeBasedOnUserSystem() {
      return window.matchMedia('(prefers-color-scheme: light)').matches
    }
  }
}
</script>

<style lang="scss">
.settings {
  margin-top: 20px;
  background: var(--primary-background);
  height: 100%;
  padding: 40px;

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
