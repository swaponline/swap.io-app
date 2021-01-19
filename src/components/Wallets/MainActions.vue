<template>
  <v-speed-dial v-model="fab" bottom left direction="top" transition="slide-y-reverse-transition">
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
    <v-btn fab dark small color="indigo">
      <v-icon>mdi-swap-horizontal</v-icon>
    </v-btn>
    <v-btn fab dark small color="blue" @click="$emit('activeForm', 'user')">
      <v-icon>mdi-account-plus</v-icon>
    </v-btn>
    <v-btn fab dark small color="green" @click="$emit('activeForm', 'wallet')">
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

<style></style>
