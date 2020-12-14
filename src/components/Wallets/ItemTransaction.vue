<template>
  <v-list-item class="item-transition">
    <v-list-item-avatar size="60">
      <v-icon
        class="item-transition__icon grey lighten-1"
        dark
        x-large
        :class="{
          'item-transition__icon--received': type.toLowerCase() === 'received'
        }"
      >
        mdi-arrow-bottom-left
      </v-icon>
    </v-list-item-avatar>
    <template>
      <v-list-item-content class="text-left">
        <v-list-item-title>
          <span>{{ type }}</span>
          <span>{{ status }}</span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <span>{{ time }}</span>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-title>
          <span>{{ currency.toUpperCase() }}</span>
          <span>{{ value }}</span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <span>USD</span>
          <span>{{ valueInUsd }}</span>
        </v-list-item-subtitle>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script>
export default {
  name: 'ItemTransaction',
  props: {
    currency: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss"></style>
