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
      <v-tab v-for="tab in tabs" :key="tab">{{ tab }}</v-tab>
    </v-tabs>
    <div class="transactions__horizontal-line"></div>
    <v-tabs-items v-model="activeTab">
      <v-tab-item v-for="tab in tabs" :key="tab">
        <list-transactions
          ref="transaction"
          class="transactions__list"
          :class="isCompressedWallet ? 'transactions__list--stretch' : ''"
          :address="currentAddress"
          :filter-type="tab"
          @compressedWallet="$emit('compressedWallet')"
        ></list-transactions>
      </v-tab-item>
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
    currentWallet() {
      if (this.wallet && this.siblingList) {
        return this.siblingList.find(el => el.address === this.$route.params.walletAddress) || {}
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
  }
  &__horizontal-line {
    width: 100%;
    height: 2px;
    background: #e5e5e5;
    margin-top: -2px;
  }
  &__list {
    max-height: calc(var(--vh, 1vh) * 100 - 430px);
    overflow-x: hidden;
    overflow-y: auto;
    @include tablet {
    }
    &--stretch {
      max-height: calc(var(--vh, 1vh) * 100 - 330px);
      @include tablet {
        max-height: calc(var(--vh, 1vh) * 100 - 268px);
      }
    }
    @include small-height {
      max-height: none;
      height: 100%;
      &--stretch {
        max-height: none;
        @include tablet {
          max-height: calc(var(--vh, 1vh) * 100 - 268px);
        }
      }
    }
  }
}
</style>
