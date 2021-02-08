<template>
  <v-tabs fixed-tabs height="auto" color="#000000" slider-color="#000000" slider-size="4" class="tabs">
    <v-tab v-for="tab in tabs" :key="tab.id" :to="tab.to" class="tabs__item">
      {{ tab.label }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'Tabs',
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
          to: { name: 'Wallets' }
        },
        {
          id: 3,
          label: 'History',
          to: { name: 'History' }
        },
        {
          id: 4,
          label: 'Settings',
          to: { name: 'Settings' }
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.tabs {
  background: $--white;

  @include tablet {
    padding: 0 40px;
    border-top: 1px solid $--grey;
  }
  @include phone {
    padding: 0 0;
  }

  &__item {
    min-height: 85px;
    max-width: 175px;
    margin: 0 0 !important;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-small-subtitle;
    line-height: 27px;
    letter-spacing: 0.01em;
    text-transform: none;
    @include tablet {
      max-width: none;
      min-height: 70px;
    }
  }
}
</style>
