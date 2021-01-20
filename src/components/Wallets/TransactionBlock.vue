<template>
  <div class="transactions">
    <v-tabs
      ref="tabs"
      v-model="activeTab"
      class="transactions__tabs"
      background-color="transparent"
      fixed-tabs
      color="#000000"
      slider-size="2"
    >
      <v-tab v-for="tab in tabs" :key="tab.id" :href="`#${tab.id}`">{{ tab.label }}</v-tab>
    </v-tabs>
    <div class="transactions__horizontal-line"></div>
    <v-tabs-items v-model="activeTab">
      <v-slide-x-reverse-transition>
        <v-tab-item v-show="activeTab" :key="activeTab" :value="activeTab">
          <list-transactions
            :address="this.$route.params.nameWallet"
            :filter-type="filterType.label"
          ></list-transactions>
        </v-tab-item>
      </v-slide-x-reverse-transition>
    </v-tabs-items>
  </div>
</template>

<script>
import ListTransactions from '@/components/Wallets/ListTransactions.vue'

export default {
  name: 'TransactionBlock',
  components: {
    ListTransactions
  },
  data() {
    return {
      activeTab: 1,
      tabs: [
        {
          id: 1,
          label: 'All'
        },
        {
          id: 2,
          label: 'Confirmed'
        },
        {
          id: 3,
          label: 'Pending'
        },
        {
          id: 4,
          label: 'Invoices'
        }
      ]
    }
  },
  computed: {
    filterType() {
      return this.tabs.find(tab => tab.id === +this.activeTab)
    },
    siblingList() {
      return this.$store.getters.siblingList
    },
    currentWallet() {
      if (this.wallet && this.siblingList) {
        return this.siblingList.find(el => el.address === this.$route.params.nameWallet) || {}
      }
      return {}
    }
  }
}
</script>

<style lang="scss">
.transactions {
  width: 100%;
  background: $--white;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  &__tabs {
    position: relative;
    z-index: 1;
  }
  &__horizontal-line {
    width: 100%;
    height: 2px;
    background: #e5e5e5;
    margin-top: -2px;
  }
}
</style>
