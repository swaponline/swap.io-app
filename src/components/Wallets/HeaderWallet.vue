<template>
  <v-toolbar class="header-wallet" color="purple">
    <v-btn
      class="header-wallet__back-button"
      icon
      color="white"
      :to="{ name: 'Wallets', query: { search: undefined } }"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-toolbar-title class="header-wallet__title pl-2">Bitcoin (Personal)</v-toolbar-title>

    <v-spacer />

    <v-btn icon color="white" @click.stop="share">
      <v-icon>mdi-share-variant</v-icon>
    </v-btn>

    <v-btn icon color="white" @click.stop="$emit('openMenu', 'menu')">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'HeaderWallet',
  props: {
    address: {
      type: String,
      required: true
    }
  },
  methods: {
    share() {
      if (navigator && navigator.canShare) {
        navigator.share({
          title: 'Номер кошелька', // Заголовок
          text: `Номер кошелька для перевода: \n${this.address}` // текст
        })
      } else {
        this.$emit('openMenu', 'share')
      }
    }
  }
}
</script>

<style lang="scss">
.header-wallet {
  &__title {
    color: $--white;
  }
  &__back-button {
    display: none;
  }
}
@include tablet {
  .header-wallet {
    &__back-button {
      display: inline-flex;
    }
  }
}
</style>
