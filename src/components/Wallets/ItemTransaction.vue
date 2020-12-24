<template>
  <v-expansion-panel class="item-transaction my-0">
    <v-expansion-panel-header class="item-transaction__header px-1">
      <v-list-item-content class="flex-grow-0 mr-1">
        <v-icon
          class="item-transaction__icon lighten-1"
          background="white"
          :class="{
            'item-transaction__icon--send': !isReceived
          }"
        >
          mdi-arrow-bottom-left
        </v-icon>
        <h3 class="item-transaction__time">{{ `${hours}:${minutes}` }}</h3>
      </v-list-item-content>
      <v-list-item-content class="text-left">
        <v-list-item-title class="item-transaction__title">
          <span class="item-transaction__type">{{ isReceived ? 'Received' : 'Sent' }}</span>
          <span class="item-transaction__status">CONFIRMED</span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <form v-if="comment !== undefined" class="item-transaction__descr" @submit.prevent="addComment">
            <input v-model="comment" type="text" class="item-transaction__input-descr" @click.stop />
          </form>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action class="flex-grow-0 mr-1">
        <v-list-item-title class="item-transaction__title justify-end">
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
      <v-list-item-action class="flex-grow-0 mr-1 ml-2 item-transaction__balance">
        <v-list-item-title class="item-transaction__title">
          <span class="item-transaction__balance-title">Balance: </span>
        </v-list-item-title>
        <v-list-item-subtitle class="item-transaction__subtitle">
          <span class="item-transaction__balance-value">{{ currentBalance }}</span>
        </v-list-item-subtitle>
      </v-list-item-action>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <p class="text-left">
        {{ comment }}
      </p>
    </v-expansion-panel-content>
  </v-expansion-panel>
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
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      comment: ''
    }
  },
  computed: {
    currentBalance() {
      const wallet = this.journal[0].balance.find(wall => wall.wallet === this.address)
      return (wallet.balance / 10 ** this.decimal).toFixed(this.currentDecimal)
    },
    isReceived() {
      return this.to === this.address
    },
    computedValue() {
      return (this.isReceived ? '+' : '-') + (this.value / 10 ** this.decimal).toFixed(this.currentDecimal)
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
    decimal() {
      return this.journal[0].asset.decimals || 1
    },
    rateValue() {
      return this.journal[0].asset.rate?.value || 500
    },
    currentDecimal() {
      return Math.ceil(this.rateValue).toString().length + 1
    },
    valueInUsd() {
      return ((this.value / 10 ** this.decimal) * this.rateValue).toFixed(2)
    }
  },
  mounted() {
    if (this.description) {
      this.comment = this.description || undefined
    } else {
      this.comment = this.isReceived ? `From: ${this.from}` : `To: ${this.to}`
    }
  },
  methods: {
    addComment() {
      this.description = this.comment || undefined
      if (this.comment === '') {
        this.comment = this.description
      }
    }
  }
}
</script>

<style lang="scss">
.item-transaction {
  border-bottom: 1px solid rgba($color: $--black, $alpha: 0.12);
  border-top: 1px solid rgba($color: $--black, $alpha: 0.12);
  &[aria-expended] {
    margin: 0 0;
  }
  &:after {
    border: none;
  }
  &:before {
    box-shadow: none;
  }
  &__header {
    padding: 0 0;
  }
  &__title {
    display: flex;
    align-items: center;
    font-size: $--font-size-medium;
    font-weight: $--font-weight-bold;
    width: 100%;
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
    text-align: center;
    font-size: $--font-size-small;
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
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    color: $--grey;
    font-size: $--font-size-base;
  }
  &__value-in-usd {
    margin-left: 20px;
  }
  &__icon {
    &--send {
      transform: rotate(180deg);
    }
  }
  &__descr {
    display: flex;
    font-size: $--font-size-base;
    line-height: 15px;
  }
  &__input-descr {
    outline: none;
    border: none;
    color: $--red;
    width: 100%;
  }
  &__button-descr {
    font-size: $--font-size-small;
    line-height: 15px;
    background: rgba($color: $--blue, $alpha: 0.2);
    padding: 2px 2px;
  }
  &__balance-title {
    font-size: $--font-size-small;
    width: 100%;
    text-align: center;
    color: $--grey;
  }
  &__balance-value {
    color: $--grey;
    font-size: $--font-size-medium;
    width: 100%;
    text-align: center;
  }
}
@include tablet {
  .item-transaction {
    &__balance {
      display: none;
    }
  }
}
</style>
