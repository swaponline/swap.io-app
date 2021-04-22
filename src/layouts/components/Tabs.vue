<template>
  <v-tabs fixed-tabs height="auto" color="#000000" slider-color="var(--main-color)" slider-size="4" class="tabs">
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
          to: { name: 'Swap' }
        }
        // {
        //   id: 3,
        //   label: 'Frame',
        //   to: { name: 'Frame' }
        // }
        // {
        //   id: 4,
        //   label: 'Settings',
        //   to: { name: 'Settings' }
        // }
      ]
    }
  }
}
</script>

<style lang="scss">
.tabs {
  margin-top: auto;
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
    min-width: 80px;
    margin: 0 0 !important;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-small-subtitle;
    color: $--black !important;
    line-height: 27px;
    letter-spacing: 0.01em;
    text-transform: none;

    @include tablet {
      font-size: $--font-size-subtitle;
      max-width: none;
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
      min-height: 50px;
    }
  }
}
</style>
