<template>
  <v-card flat class="transaction-item d-flex justify-space-between" @click="openDetails">
    <div class="transaction-item__time">
      <v-icon
        class="transaction-item__icon lighten-1"
        background="white"
        :class="{
          'transaction-item__icon--send': !isReceived
        }"
      >
        mdi-arrow-bottom-left
      </v-icon>
      <span>{{ `${hours}:${minutes}` }}</span>
    </div>
    <div class="transaction-item__main-info">
      <transaction-description v-model="comment"></transaction-description>
      <span class="transaction-item__status">{{ status }}</span>
    </div>
    <div
      class="transaction-item__value"
      :class="{
        'transaction-item__value--send': !isReceived
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
          <span class="transaction-item__value-in-usd" v-on="on">~${{ valueInUsd }}</span>
        </template>
        <span> USD Equivalent of transaction amount @ {{ rateValue.toFixed(2) }} USD/ETH)</span>
      </v-tooltip>
    </div>
    <div class="transaction-item__amount">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <span class="transaction-item__balance-value" v-on="on">{{ currentBalance }}</span>
        </template>
        <span>Balance after transaction</span>
      </v-tooltip>
    </div>
  </v-card>
</template>

<script>
import TransactionDescription from './TransactionDescription.vue'

const NUMBER_REMAINING_CHARACTERS = 4

export default {
  name: 'ItemTransaction',
  inject: ['mediaQueries'],
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
      default: 'PENDING'
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
      comment: '',
      inputShow: false
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
      const wallet = this.journal[0].balance.find(point => point.wallet === this.address)
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
    },
    isMobile() {
      return this.mediaQueries.phone
    }
  },
  watch: {
    isMobile: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.comment =
            this.description || this.isReceived
              ? `From: ${this.shortString(this.from)}`
              : `To: ${this.shortString(this.to)}`
        } else {
          this.comment = this.description || this.isReceived ? `From: ${this.from}` : `To: ${this.to}`
        }
      }
    }
  },
  methods: {
    openDetails() {
      this.$emit('open-transaction')
    },
    shortString(string) {
      const initialNumber = string.split('').length - NUMBER_REMAINING_CHARACTERS
      return `***${string.slice(initialNumber)}`
    }
  }
}
</script>

<style lang="scss">
.transaction-item {
  border-bottom: 1px solid get-theme-for($border-color, 'primary') !important;
  border-top: 1px solid get-theme-for($border-color, 'primary') !important;
  padding: 20px 0;
  margin: 0 20px;
  border-radius: 0px !important;
  background-color: get-theme-for($background, 'primary') !important;
  transition: $--theme-transition;

  @include tablet {
    margin: 0;
  }

  @include phone {
    padding: 20px;
  }

  &:after {
    display: none;
  }
  &:before {
    display: none;
  }
  &__header {
    padding: 16px 0;
  }
  &__icon {
    margin-bottom: 4px;
    &--send {
      transform: rotate(180deg);
    }
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
  &__status {
    margin-top: 7px;
  }
  &__main-info {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    padding: 0 10px;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small;
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
    line-height: 25px;

    &--send {
      color: $--text-color-error;
    }
  }

  &__value-in-usd {
    margin-top: 4px;
    font-size: $--font-size-small;
    line-height: 16px;
    color: get-theme-for($text, 'primary');
  }

  &__amount {
    flex: 0 !important;
    margin: 0 15px;
    align-self: stretch;
    font-size: $--font-size-extra-small-subtitle;
    line-height: 25px;
    color: $--grey-2;

    @include tablet {
      display: none;
    }
  }
}
</style>
