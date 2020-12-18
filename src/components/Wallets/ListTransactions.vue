<template>
  <v-list>
    <v-subheader>{{ filterType }}</v-subheader>

    <item-transaction
      v-for="transaction in transactions"
      :key="transaction.hash"
      v-bind="transaction"
      :address="address"
    />
  </v-list>
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
      return this.$store.state[TRANSACTION_NAME].list.filter(el => el.to === this.address || el.from === this.address)
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

<style lang="scss"></style>
