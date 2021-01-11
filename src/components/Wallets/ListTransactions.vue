<template>
  <v-expansion-panels>
    <div v-for="transaction in transactions" :key="transaction.date" class="list-transaction__block">
      <v-subheader class="list-transaction__title">{{ transaction.date }}</v-subheader>
      <item-transaction
        v-for="item in transaction.list"
        :key="item.hash"
        v-bind="item"
        :address="address"
        class="list-transaction__item"
      />
      <item-link-transaction
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
import ItemTransaction from './ItemTransaction.vue'
import ItemLinkTransaction from './ItemLinkTransaction.vue'

export default {
  name: 'ListTransactions',
  components: {
    ItemTransaction,
    ItemLinkTransaction
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
      return this.listTransactionsSortByDate(this.$route.query.wallet)
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
  created() {
    this.actionGetTransaction()
  },
  methods: {
    ...mapActions({
      actionGetTransaction: GET_TRANSACTIONS
    })
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
      display: none !important;
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
