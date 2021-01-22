<template>
  <v-expansion-panels ref="transaction" class="list-transaction">
    <div v-for="transaction in transactions" :key="transaction.date" class="list-transaction__block">
      <v-subheader class="list-transaction__title">{{ transaction.date }}</v-subheader>
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
  data() {
    return {
      scrollTop: 0
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
    eventScroll() {
      this.$emit('compressedWallet')
    }
  }
}
</script>

<style lang="scss">
.list-transaction {
  &__block {
    flex-grow: 1;
    width: 100%;
  }
  &__title {
    width: 100%;
    text-align: left;
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
