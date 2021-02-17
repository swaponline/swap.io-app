<template>
  <div ref="transaction" class="list-transaction" :class="isCompressedWallet ? 'list-transaction--stretch' : ''">
    <div v-for="transaction in transactions" :key="transaction.date" class="list-transaction__block">
      <v-subheader ref="headers" class="list-transaction__title">
        <h4>{{ transaction.date }}</h4>
      </v-subheader>
      <transaction-item
        v-for="item in transaction.list"
        :key="item.hash"
        v-bind="item"
        :address="address"
        class="list-transaction__item"
      />
    </div>
    <v-btn class="list-transaction__up-button" depressed @click="unCompressWallet">UP</v-btn>
  </div>
</template>

<script>
import { GET_TRANSACTIONS } from '@/store/modules/Transactions'
import { mapActions, mapGetters } from 'vuex'
import TransactionItem from './TransactionItem.vue'

export default {
  name: 'ListTransactions',
  inject: ['mediaQueries'],
  components: {
    TransactionItem
  },
  props: {
    filterType: {
      type: String,
      default: 'all'
    },
    address: {
      type: String,
      required: true
    },
    isCompressedWallet: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['listTransactionsSortByDate']),
    transactions() {
      return this.listTransactionsSortByDate(this.address)
    },
    list() {
      return [
        {
          id: 1,
          type: 'Received',
          currency: 'BTC',
          value: 0.693232,
          valueInUsd: 13382.39,
          date: new Date(),
          status: 'confirmed'
        },
        {
          id: 2,
          type: 'Received',
          currency: 'BTC',
          value: 0.693232,
          valueInUsd: 13382.39,
          date: new Date(),
          status: 'confirmed'
        }
      ]
    }
  },
  mounted() {
    this.$refs.transaction.addEventListener('scroll', this.eventScroll)
    this.actionGetTransaction()
  },
  beforeDestroy() {
    this.$refs.transaction.removeEventListener('scroll', this.eventScroll)
  },
  methods: {
    ...mapActions({
      actionGetTransaction: GET_TRANSACTIONS
    }),
    eventScroll(e) {
      if (this.mediaQueries.phone && this.$refs.headers && this.$refs.headers.length > 0) {
        this.$refs.headers.forEach(el => {
          const domEl = el.$el
          if (domEl.offsetTop <= e.target.scrollTop) {
            domEl.classList.add('sticky')
          } else {
            domEl.classList.remove('sticky')
          }
        })
      }
      this.$emit('compress-wallet')
    },
    unCompressWallet() {
      if (this.$refs.headers && this.$refs.headers.length > 0) {
        this.$refs.headers.forEach(el => {
          const domEl = el.$el
          domEl.classList.remove('sticky')
        })
      }
      this.$emit('uncompress-wallet')
    }
  }
}
</script>

<style lang="scss">
.list-transaction {
  --button-display: none;
  &--stretch {
    @include phone {
      --button-display: inline-flex;
    }
  }
  &__block {
    flex-grow: 1;
    width: 100%;
    @include tablet {
      margin: 0 40px;
      width: calc(100% - 80px);
    }
    @include phone {
      margin: 0 0;
      width: 100%;
    }
  }
  &__title {
    width: 100%;
    text-align: left;
    z-index: 100;
    background: $--white;
    top: 0;
    display: flex;
    justify-content: space-between;
    &.sticky {
      position: sticky;
    }
  }
  &__up-button {
    display: var(--button-display);
    border-radius: 12px;
    position: absolute;
    z-index: 200;
    right: 10px;
    top: 5px;
  }
}
</style>
