<template>
  <v-speed-dial v-model="fab" class="main-actions" bottom left direction="top" transition="slide-y-reverse-transition">
    <template #activator>
      <v-btn v-model="fab" color="blue darken-2" dark fab>
        <v-icon v-if="fab">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-plus
        </v-icon>
      </v-btn>
    </template>
    <v-btn
      fab
      dark
      small
      color="indigo"
      class="main-actions__button--rotate"
      @click="$emit('activeForm', 'send-block')"
    >
      <v-icon>mdi-arrow-up-circle</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="indigo"
      class="main-actions__button--rotate"
      @click="$emit('activeForm', 'invoice-block')"
    >
      <v-icon>mdi-arrow-down-circle</v-icon>
    </v-btn>
    <v-btn fab dark small color="blue" @click="$emit('activeForm', 'create-user-form')">
      <v-icon>mdi-account-plus</v-icon>
    </v-btn>
    <v-btn fab dark small color="green" @click="$emit('activeForm', 'create-wallet-form')">
      <v-icon>mdi-wallet</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: 'MainActions',
  data() {
    return {
      fab: false
    }
  }
}
</script>

<style lang="scss">
.main-actions {
  &__button {
    &--rotate {
      transform: rotate(45deg);
    }
  }
}
.v-speed-dial {
  position: absolute;
  @include tablet {
    position: fixed;
    bottom: 80px !important;
    z-index: 9999;
    transition: 0.5s;
    &--wallet {
      transform: translate(100vw, 0);
    }
  }
}
</style>
