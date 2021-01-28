<template>
  <v-expansion-panels ref="transaction" class="list-transaction" accordion>
    <div v-for="transaction in transactions" :key="transaction.date" class="list-transaction__block">
      <v-subheader ref="headers" class="list-transaction__title">
        <h4>{{ transaction.date }}</h4>
        <v-btn class="list-transaction__up-button" depressed @click="deCompressedWallet">UP</v-btn>
      </v-subheader>
      <transaction-item
        v-for="item in transaction.list"
        :key="item.hash"
        v-bind="item"
        :address="address"
        class="list-transaction__item"
      />
      <transaction-link-item
        v-for="item in transaction.list"
        :key="item.hash + 'link'"
        v-bind="item"
        :address="address"
        class="list-transaction__item-link"
      />
    </div>
  </v-expansion-panels>
</template>

<script>
import { GET_TRANSACTIONS } from '@/store/modules/Transactions'
import { mapActions, mapGetters } from 'vuex'
import TransactionItem from './TransactionItem.vue'
import TransactionLinkItem from './TransactionLinkItem.vue'

export default {
  name: 'ListTransactions',
  components: {
    TransactionItem,
    TransactionLinkItem
  },
  props: {
    filterType: {
      type: String,
      default: 'all'
    },
    address: {
      type: String,
      required: true
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
    this.$refs.transaction.$el.addEventListener('scroll', this.eventScroll)
    this.actionGetTransaction()
  },
  beforeDestroy() {
    this.$refs.transaction.$el.removeEventListener('scroll', this.eventeventScroll)
  },
  methods: {
    ...mapActions({
      actionGetTransaction: GET_TRANSACTIONS
    }),
    eventScroll(e) {
      if (window.innerWidth < 480 && this.$refs.headers && this.$refs.headers.length > 0) {
        this.$refs.headers.forEach(el => {
          const domEl = el.$el
          if (domEl.offsetTop <= e.target.scrollTop) {
            domEl.classList.add('sticky')
          } else {
            domEl.classList.remove('sticky')
          }
        })
      }
      this.$emit('compressedWallet')
    },
    deCompressedWallet() {
      if (this.$refs.headers && this.$refs.headers.length > 0) {
        this.$refs.headers.forEach(el => {
          const domEl = el.$el
          domEl.classList.remove('sticky')
        })
      }
      this.$emit('deCompressedWallet')
    }
  }
}
</script>

<style lang="scss">
.list-transaction {
  position: relative;
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
    z-index: 1000;
    background: $--white;
    top: 0;
    display: flex;
    justify-content: space-between;
    &.sticky {
      position: sticky;
      .list-transaction__up-button {
        display: inline-block;
      }
    }
  }
  &__up-button {
    display: none;
    border-radius: 12px;
  }
  &__item {
    @include tablet {
      display: none;
    }
  }
  &__item-link {
    display: none;
    @include tablet {
      display: flex;
    }
  }
}
</style>
