<template>
  <div class="transactions">
    <v-tabs
      ref="tabs"
      v-model="activeTab"
      class="transactions__tabs"
      background-color="transparent"
      fixed-tabs
      slider-color="#101010"
      slider-size="2"
    >
      <v-tab v-for="tab in tabs" :key="tab" class="transactions__tab">{{ tab }}</v-tab>
    </v-tabs>
    <div class="transactions__horizontal-line"></div>

    <transaction-loader v-if="loadingTransaction"></transaction-loader>

    <v-tabs-items v-else v-model="activeTab">
      <v-tab-item v-for="tab in tabs" :key="tab">
        <transaction-list
          ref="transaction"
          class="transactions__list"
          :class="{ 'transactions__list--stretch': isCompressedWallet }"
          :address="currentAddress"
          :filter-type="tab"
          :is-compressed-wallet="isCompressedWallet"
          @compress-wallet="$emit('compress-wallet')"
          @uncompress-wallet="$emit('uncompress-wallet')"
        ></transaction-list>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TransactionLoader from '@/components/TransactionLoader.vue'

import { GET_TRANSACTIONS, MODULE_NAME as TRANSACTIONS_MODULE } from '@/store/modules/Transactions'
import TransactionList from './List.vue'

export default {
  name: 'Transactions',
  components: {
    TransactionList,
    TransactionLoader
  },
  props: {
    isCompressedWallet: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeTab: null,
      tabs: ['all', 'confirmed', 'pending', 'invoices']
    }
  },
  computed: {
    currentAddress() {
      return this.$route.params.walletAddress
    },
    filterType() {
      return this.tabs.find(tab => tab.id === +this.activeTab)
    },
    siblingList() {
      return this.$store.getters.siblingList
    },
    loadingTransaction() {
      return this.$store.state[TRANSACTIONS_MODULE].loading
    },
    currentWallet() {
      if (this.wallet && this.siblingList) {
        return this.siblingList.find(el => el.address === this.$route.params.walletAddress) || {}
      }
      return {}
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
  background: $--white;
  overflow: hidden;
  border-radius: 12px 12px 0 0;

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
    color: $--black !important;
    @include phone {
      width: 25%;
      font-size: $--font-size-small;
    }
  }
  &__horizontal-line {
    width: 100%;
    height: 2px;
    background: $--light-grey;
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
}
</style>
