<template>
  <v-expansion-panels>
    <div v-for="transaction in transactions" :key="transaction.hash" class="list-transaction__item">
      <v-subheader v-if="transaction.nameDay" class="list-transaction__title">{{ transaction.nameDay }}</v-subheader>
      <item-transaction v-else v-bind="transaction" :address="address" />
    </div>
  </v-expansion-panels>
</template>

<script>
import { MODULE_NAME as TRANSACTION_NAME, GET_TRANSACTION } from '@/store/modules/Transaction'
import { mapActions } from 'vuex'
import ItemTransaction from './ItemTransaction.vue'

export default {
  name: 'ListTransactions',
  components: { ItemTransaction },
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
    transactions() {
      return this.$store.state[TRANSACTION_NAME].list
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
      actionGetTransaction: GET_TRANSACTION
    })
  }
}
</script>

<style lang="scss">
.list-transaction {
  &__item {
    display: flex;
    flex-grow: 1;
    width: 100%;
  }
  &__title {
    width: 100%;
    text-align: left;
  }
}
</style>
