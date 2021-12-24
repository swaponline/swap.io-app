<template>
  <v-tabs centered height="auto" :slider-color="sliderColor" slider-size="4" class="tabs">
    <v-tab v-for="tab in tabs" :key="tab.id" :disabled="disabled" :to="tab.to" class="tabs__item">
      {{ tab.label }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tabs: [
        {
          id: 1,
          label: 'Wallets',
          to: { name: 'Wallets' }
        },
        {
          id: 2,
          label: 'Swap',
          to: { name: 'Swap' }
        },
        {
          id: 4,
          label: 'Settings',
          to: { name: 'Settings' }
        }
      ]
    }
  },
  computed: {
    sliderColor() {
      return this.disabled ? 'transparent' : 'var(--main-color)'
    }
  }
}
</script>

<style lang="scss">
.tabs {
  margin-top: auto;
  z-index: 1;

  @include tablet {
    box-shadow: 0px -1px 9px rgba($--black, 0.06);

    &.theme--dark {
      box-shadow: 0px -1px 9px rgba($--white, 0.06);
    }
  }

  .v-tabs-bar {
    background-color: get-theme-for($background, 'primary') !important;
    transition: $--theme-transition;
  }

  @include tablet {
    padding: 0;
  }

  @include phone {
    padding: 0 0;
  }

  &__item {
    min-height: $--header-height;
    width: 175px;
    min-width: 80px;
    font-weight: $--font-weight-regular;
    font-size: $--font-size-extra-small-subtitle;
    color: get-theme-for($text, 'primary') !important;
    line-height: 27px;
    letter-spacing: 0.01em;
    text-transform: none;

    @include tablet {
      font-size: $--font-size-subtitle;
      width: auto;
      flex-grow: 1;
      min-height: 80px;
    }

    @include phone {
      padding: 0 0;
      font-weight: $--font-weight-semi-bold;
      font-size: $--font-size-base;
      max-width: none;
      min-height: 55px;
    }

    @include phone {
    }
  }
}
</style>
