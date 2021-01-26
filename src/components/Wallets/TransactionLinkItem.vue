<template>
  <v-list-item to="/" class="item-link-transaction px-1">
    <div class="item-link-transaction__time">
      <v-icon
        class="item-link-transaction__icon lighten-1"
        background="white"
        :class="{
          'item-link-transaction__icon--send': !isReceived
        }"
      >
        mdi-arrow-bottom-left
      </v-icon>
      <span>{{ `${hours}:${minutes}` }}</span>
    </div>
    <div class="item-link-transaction__main-info">
      <transaction-description v-model="comment"></transaction-description>
      <span>CONFIRMED</span>
    </div>
    <div
      class="item-link-transaction__value"
      :class="{
        'item-link-transaction__value--send': !isReceived
      }"
    >
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <span v-on="on">
            {{ computedValue }}
          </span>
        </template>
        <span>Balance change</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <span class="item-link-transaction__value-in-usd" v-on="on">~${{ valueInUsd }}</span>
        </template>
        <span> USD Equivalent of transaction amount @ {{ rateValue.toFixed(2) }} USD/ETH)</span>
      </v-tooltip>
    </div>
  </v-list-item>
</template>

<script>
import TransactionDescription from './TransactionDescription.vue'

export default {
  name: 'ItemLinkTransaction',
  components: {
    TransactionDescription
  },
  props: {
    journal: {
      type: Array,
      default() {
        return []
      }
    },
    hash: {
      type: String,
      required: true
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
    entries() {
      return this.journal[0].entries
    },
    transactionFee() {
      const feeEntries = this.entries.filter(entry => entry.label && entry.value > 0)
      return feeEntries.reduce((acc, el) => {
        return acc + (el.value / 10 ** this.decimal).toFixed(this.currentDecimal)
      }, 0)
    },
    currentBalance() {
      const wallet = this.journal[0].balance.find(wall => wall.wallet === this.address)
      if (wallet) {
        return (wallet.balance / 10 ** this.decimal).toFixed(this.currentDecimal)
      }
      return ''
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
    this.comment =
      this.description || this.isReceived ? `From: ***${this.from.slice(-4)}` : `To: ***${this.to.slice(-4)}`
  }
}
</script>

<style lang="scss">
.item-link-transaction {
  display: flex;
  border-bottom: 1px solid rgba($color: $--black, $alpha: 0.05);
  border-top: 1px solid rgba($color: $--black, $alpha: 0.05);
  margin: 0 10px;
  padding: 16px 0;
  &:after {
    display: none;
  }
  &:before {
    display: none;
  }
  &__header {
    padding: 0 0;
    min-height: 80px;
  }
  &__time {
    flex: 0 !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    font-size: $--font-size-small;
    line-height: 16px;
    font-weight: $--font-weight-medium;
  }
  &__main-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 10px;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-small;
    color: $--green;
  }
  &__value {
    flex: 0 !important;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
    color: $--green;
    &--send {
      color: $--red;
    }
  }
  &__value-in-usd {
    margin-top: 4px;
    font-size: $--font-size-small;
    line-height: 16px;
    color: $--black;
  }
}
</style>
