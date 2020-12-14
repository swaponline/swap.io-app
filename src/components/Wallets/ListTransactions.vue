<template>
  <v-list>
    <v-subheader>{{ filterType }}</v-subheader>

    <item-transaction v-for="transaction in list" :key="transaction.id" v-bind="transaction" />
  </v-list>
</template>

<script>
import ItemTransaction from './ItemTransaction.vue'

export default {
  name: 'ListTransactions',
  components: { ItemTransaction },
  props: {
    filterType: {
      type: String,
      default: 'all'
    }
  },
  computed: {
    list() {
      return [
        {
          id: 1,
          type: 'Received',
          currency: 'BTC',
          value: 0.693232,
          valueInUsd: 13382.39,
          data: new Date()
        },
        {
          id: 2,
          type: 'Received',
          currency: 'BTC',
          value: 0.693232,
          valueInUsd: 13382.39,
          data: new Date()
        }
      ]
    }
  }
}
</script>

<style lang="scss"></style>
