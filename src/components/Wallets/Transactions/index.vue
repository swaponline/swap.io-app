<template>
  <div class="transactions">
    <transactions-search v-model="search" />
    <v-tabs
      ref="tabs"
      v-model="activeTab"
      background-color="transparent"
      class="transactions__tabs"
      fixed-tabs
      slider-color="var(--main-color)"
      slider-size="2"
    >
      <v-tab v-for="tab in tabs" :key="tab" :disabled="isEmptyTransactions" class="transactions__tab">{{ tab }}</v-tab>
    </v-tabs>
    <div class="transactions__horizontal-line"></div>

    <v-loader :active="loading"></v-loader>
    <v-tabs-items v-model="activeTab">
      <v-tab-item v-for="tab in tabs" :key="tab" class="transactions__tab-item">
        <template v-if="isEmptyTransactions && !loading">
          <swap-skeleton boilerplate max-width="30%" type="card-heading" />
          <transaction-skeleton v-for="n in 7" :key="`transaction-skeleton-${n}`" />
          <p class="transactions__skeleton-text">There are no transactions at this moment.</p>
        </template>
        <transaction-list
          v-else
          :address="currentAddress"
          :class="{ 'transactions__list--stretch': isCompressedWallet }"
          :is-compressed-wallet="isCompressedWallet"
          :transactions="filteredTransactions"
          class="transactions__list"
          @compress-wallet="$emit('compress-wallet')"
          @uncompress-wallet="$emit('uncompress-wallet')"
        ></transaction-list>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import {
  GET_TRANSACTIONS,
  MODULE_NAME as TRANSACTIONS_MODULE,
  TRANSACTIONS_SORTED_BY_DATE
} from '@/store/modules/Transactions'
import VLoader from '@/components/Loaders/VLoader.vue'
import TransactionList from './List.vue'
import TransactionsSearch from './Search.vue'
import TransactionSkeleton from './TransactionSkeleton.vue'

export default {
  name: 'Transactions',
  components: { TransactionList, VLoader, TransactionsSearch, TransactionSkeleton },
  props: {
    isCompressedWallet: { type: Boolean, default: false }
  },
  data() {
    return {
      activeTab: 0,
      tabs: ['all', 'confirmed', 'pending', 'invoices'],
      search: ''
    }
  },
  computed: {
    transactions() {
      return this.$store.getters[TRANSACTIONS_SORTED_BY_DATE](this.currentAddress)
    },
    filteredTransactions() {
      const { transactions } = this
      const search = this.search.toLowerCase()

      if (!this.search) return transactions

      const filtered = transactions.map(({ date, list }) => {
        const filteredList = list.filter(
          ({ from, hash, to, value }) =>
            from.toLowerCase().includes(search) ||
            hash.toLowerCase().includes(search) ||
            to.toLowerCase().includes(search) ||
            value.toString().includes(search)
        )

        return { date, list: filteredList }
      })

      return filtered.filter(({ list }) => list.length > 0)
    },
    isEmptyTransactions() {
      return this.filteredTransactions.length === 0
    },
    currentAddress() {
      return this.$route.params.address
    },
    filterType() {
      return this.tabs.find(tab => tab.id === +this.activeTab)
    },
    loading() {
      return this.$store.state[TRANSACTIONS_MODULE].loading
    }
  },
  mounted() {
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
.transactions {
  width: 100%;
  background: get-theme-for($background, 'primary');
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  display: flex;
  flex-direction: column;

  .v-tabs-items {
    background: get-theme-for($background, 'primary') !important;
    transition: $--theme-transition;
    height: 100%;
  }

  &__tab-item {
    height: 100%;
  }

  @include tablet {
    border-radius: 0;
  }

  &__list {
    height: 100%;
    overflow: auto;
  }

  &__tabs {
    position: relative;
    z-index: 1;
    @include tablet {
      padding: 0 40px;
    }
    @include phone {
      padding: 0 0;
      > div:first-child {
        height: 40px;
      }
    }
  }

  &__tab {
    padding: 0 0;
    min-width: 80px;
    font-weight: $--font-weight-semi-bold;
    color: get-theme-for($text, 'primary') !important;
    transition: $--theme-transition;

    @include phone {
      width: 25%;
      font-size: $--font-size-small;
    }
  }

  &__horizontal-line {
    width: 100%;
    height: 2px;
    background: get-theme-for($border-color, 'primary');
    margin-top: -2px;
  }

  &__list {
    max-height: calc(var(--vh, 1vh) * 100 - 435px);
    overflow-x: hidden;
    overflow-y: auto;

    @include phone {
      max-height: calc(var(--vh, 1vh) * 100 - 355px);
    }

    &--stretch {
      max-height: calc(var(--vh, 1vh) * 100 - 325px);
      @include tablet {
        max-height: calc(var(--vh, 1vh) * 100 - 385px);
      }
      @include phone {
        max-height: calc(var(--vh, 1vh) * 100 - 230px);
      }
      @include small-phone {
        max-height: calc(var(--vh, 1vh) * 100 - 216px);
      }
    }

    @include small-height {
      max-height: none;
      height: 100%;
      &--stretch {
        max-height: none;
        @include tablet {
          max-height: calc(var(--vh, 1vh) * 100 - 385px);
        }
        @include phone {
          max-height: calc(var(--vh, 1vh) * 100 - 277px);
        }
      }
    }
  }

  &__skeleton-text {
    font-size: $--font-size-small-subtitle;
    text-align: center;
    width: 100%;
    max-width: 260px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
