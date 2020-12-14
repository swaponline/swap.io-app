<template>
  <v-toolbar class="header-wallet" color="purple">
    <v-toolbar-title class="header-wallet__title">Bitcoin (Personal)</v-toolbar-title>

    <v-spacer />

    <v-btn icon color="white">
      <v-icon>mdi-share-variant</v-icon>
    </v-btn>

    <v-btn icon color="white">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'HeaderWallet'
}
</script>

<style lang="scss">
.header-wallet {
  &__title {
    color: $--white;
  }
}
</style>
