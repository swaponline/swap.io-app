<template>
  <v-list-item class="item-transaction">
    <v-list-item-avatar size="40">
      <v-icon
        class="item-transaction__icon grey lighten-1"
        dark
        :class="{
          'item-transaction__icon--send': !isReceived
        }"
      >
        mdi-arrow-bottom-left
      </v-icon>
    </v-list-item-avatar>
    <template>
      <v-list-item-content class="text-left">
        <v-list-item-title class="item-transaction__title">
          <span class="item-transaction__type">{{ isReceived ? 'Received' : 'Sent' }}</span>
          <span v-if="status" class="item-transaction__status">{{ status }}</span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <h3 class="item-transaction__time">{{ `${hours}:${minutes}` }}</h3>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-title class="item-transaction__title">
          <span class="item-transaction__crypto-currency">{{ currency }}</span>
          <span class="item-transaction__value">{{ computedValue }}</span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <h3 class="item-transaction__subtitle">
            <span class="item-transaction__currency">USD</span>
            <span class="item-transaction__value-in-usd">~{{ valueInUsd }}</span>
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
    journal: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: ''
    },
    timestamp: {
      type: Number,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  computed: {
    isReceived() {
      return this.to === this.address
    },
    computedValue() {
      return (this.isReceived ? '+' : '-') + this.value.toString()
    },
    hours() {
      return new Date(this.timestamp)
        .getHours()
        .toString()
        .padStart(2, '0')
    },
    minutes() {
      return new Date(this.timestamp)
        .getMinutes()
        .toString()
        .padStart(2, '0')
    },
    currency() {
      return this.journal[0].asset.symbol
    },
    valueInUsd() {
      const usd = this.journal[0].asset.rate?.value || 500
      return usd * this.value
    }
  }
}
</script>

<style lang="scss">
.item-transaction {
  &__title {
    display: flex;
    align-items: center;
    font-size: $--font-size-medium;
    font-weight: $--font-weight-bold;
  }
  &__status {
    display: inline-block;
    text-transform: uppercase;
    background: $--light-blue;
    font-size: $--font-size-small;
    font-weight: $--font-weight-medium;
    color: $--blue;
    border-radius: $--small-border-radius;
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
    font-size: $--font-size-medium;
  }
  &__value-in-usd {
    margin-left: 20px;
  }
  &__icon {
    &--send {
      transform: rotate(180deg);
    }
  }
}
</style>
