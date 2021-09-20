<template>
  <div ref="transaction" class="list-transaction" :class="{ 'list-transaction--stretch': isCompressedWallet }">
    <template v-if="filteredTransactions.length">
      <div v-for="transaction in filteredTransactions" :key="transaction.date" class="list-transaction__block">
        <v-subheader ref="headers" class="list-transaction__title">
          <span>{{ transaction.date }}</span>
        </v-subheader>
        <transaction-item
          v-for="item in transaction.list"
          :key="item.hash"
          v-bind="item"
          :address="address"
          class="list-transaction__item"
          @open-transaction="openTransactionModal(item)"
        />
      </div>
    </template>

    <div v-else class="list-transaction__skeleton">
      <swap-skeleton boilerplate max-width="30%" type="card-heading" />
      <transaction-skeleton v-for="n in 5" :key="`transaction-skeleton-${n}`" />
      <p class="list-transaction__skeleton-text">There are no transactions at this moment.</p>
    </div>

    <v-btn class="list-transaction__up-button" depressed @click="unCompressWallet">UP</v-btn>
  </div>
</template>

<script>
import { ADD_MODAL } from '@/store/modules/Modals'
import { TRANSACTION_DETAILS } from '@/store/modules/Modals/names'
import { mapGetters, mapMutations } from 'vuex'
import TransactionItem from './Transaction.vue'
import TransactionSkeleton from './TransactionSkeleton.vue'

export default {
  name: 'ListTransactions',
  inject: ['mediaQueries'],
  components: { TransactionItem, TransactionSkeleton },
  props: {
    filterType: { type: String, default: 'all' },
    address: { type: String, required: true },
    isCompressedWallet: { type: Boolean, default: false },
    search: { type: String, default: '' }
  },
  computed: {
    ...mapGetters(['listTransactionsSortByDate']),
    transactions() {
      return this.listTransactionsSortByDate(this.address)
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
    }
  },
  mounted() {
    this.$refs.transaction.addEventListener('scroll', this.eventScroll)
  },
  beforeDestroy() {
    this.$refs.transaction.removeEventListener('scroll', this.eventScroll)
  },
  methods: {
    ...mapMutations({
      mutationAddModal: ADD_MODAL
    }),
    openTransactionModal(transaction) {
      this.mutationAddModal({
        name: TRANSACTION_DETAILS,
        id: transaction.hash,
        info: {
          currentWallet: this.address,
          transaction
        }
      })
    },
    eventScroll(e) {
      if (this.mediaQueries.phone && this.$refs.headers && this.$refs.headers.length > 0) {
        this.$refs.headers.forEach(el => {
          const domEl = el.$el
          if (domEl.offsetTop <= e.target.scrollTop) {
            domEl.classList.add('sticky')
          } else {
            domEl.classList.remove('sticky')
          }
        })
      }
      this.$emit('compress-wallet')
    },
    unCompressWallet() {
      if (this.$refs.headers && this.$refs.headers.length > 0) {
        this.$refs.headers.forEach(el => {
          const domEl = el.$el
          domEl.classList.remove('sticky')
        })
      }
      this.$emit('uncompress-wallet')
    }
  }
}
</script>

<style lang="scss">
.list-transaction {
  --button-display: none;
  &--stretch {
    @include phone {
      --button-display: inline-flex;
    }
  }
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
    z-index: 100;
    background: var(--primary-background);
    top: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 25px;
    color: var(--primary-text) !important;
    font-size: $--font-size-medium;
    transition: $--theme-transition;

    &.sticky {
      position: sticky;
    }
  }

  &__up-button {
    display: var(--button-display);
    border-radius: 12px;
    position: absolute;
    z-index: 200;
    right: 10px;
    top: 5px;
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
