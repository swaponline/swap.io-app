<template>
  <v-list-item class="item-transition">
    <v-list-item-avatar size="50">
      <v-icon
        class="item-transition__icon grey lighten-1"
        dark
        large
        :class="{
          'item-transition__icon--received': type.toLowerCase() === 'received'
        }"
      >
        mdi-arrow-bottom-left
      </v-icon>
    </v-list-item-avatar>
    <template>
      <v-list-item-content class="text-left">
        <v-list-item-title class="item-transition__title">
          <span class="item-transition__type">{{ type }}</span>
          <span class="item-transition__status">{{ status }}</span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <h3 class="item-transition__time">{{ `${hours}:${minutes}` }}</h3>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-title class="item-transition__title">
          <span class="item-transition__crypto-currency">{{ currency }}</span>
          <span class="item-transition__value">{{ type.toLowerCase() === 'received' ? '+' : '-' }}{{ value }}</span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <h3 class="item-transition__subtitle">
            <span class="item-transition__currency">USD</span>
            <span class="item-transition__value-in-usd">~{{ valueInUsd }}</span>
          </h3>
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
    },
    value: {
      type: Number,
      required: true
    },
    valueInUsd: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      default: ''
    }
  },
  computed: {
    hours() {
      return this.date
        .getHours()
        .toString()
        .padStart(2, '0')
    },
    minutes() {
      return this.date
        .getMinutes()
        .toString()
        .padStart(2, '0')
    }
  }
}
</script>

<style lang="scss">
.item-transition {
  &__title {
    display: flex;
    align-items: center;
    font-size: $--font-size-subtitle;
    font-weight: $--font-weight-bold;
  }
  &__status {
    display: inline-block;
    text-transform: uppercase;
    background: $--light-blue;
    font-size: $--font-size-small;
    font-weight: $--font-weight-medium;
    color: $--blue;
    border-radius: 3px;
    padding: 4px 8px;
    margin-left: 16px;
  }
  &__time {
    font-weight: $--font-weight-bold;
    color: $--grey;
  }
  &__crypto-currency {
    color: $--grey;
    text-transform: uppercase;
  }
  &__value {
    color: $--salad;
    text-transform: uppercase;
    margin-left: 16px;
  }
  &__subtitle {
    color: $--grey;
    font-size: $--font-size-small-subtitle;
  }
  &__value-in-usd {
    margin-left: 20px;
  }
}
</style>
