<template>
  <div ref="transaction" class="list-transaction" :class="{ 'list-transaction--stretch': isCompressedWallet }">
    <div v-for="transaction in transactions" :key="transaction.date" class="list-transaction__block">
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

    <swap-button small class="list-transaction__up-button" @click="unCompressWallet">UP</swap-button>
  </div>
</template>

<script>
import { ADD_MODAL } from '@/store/modules/Modals'
import { TRANSACTION_DETAILS } from '@/store/modules/Modals/names'
import { mapMutations } from 'vuex'
import TransactionItem from './Transaction.vue'

export default {
  name: 'ListTransactions',
  inject: ['mediaQueries'],
  components: { TransactionItem },
  props: {
    address: { type: String, default: '' },
    isCompressedWallet: { type: Boolean, default: false },
    transactions: { type: Array, default: () => [] }
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
    background: get-theme-for($background, 'primary');
    top: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 25px;
    color: get-theme-for($text, 'primary') !important;
    font-size: $--font-size-medium;
    transition: $--theme-transition;

    &.sticky {
      position: sticky;
    }

    @include tablet {
      padding: 0;
    }

    @include phone {
      padding: 20px;
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
}
</style>
