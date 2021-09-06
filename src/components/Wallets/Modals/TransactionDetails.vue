<template>
  <modal-wrapper
    value
    cancel-button-label="Close"
    confirm-button-label="Share"
    title="Transaction details"
    @input="close"
    @cancel="close"
    @submit="share"
  >
    <div class="transaction-details">
      <form-indent title="Hash:">
        <swap-copy-wrapper>
          <template #default="{ copy, tooltipOn }">
            <button class="transaction-details__copy-button" type="button" @click="copy(hash)" v-on="tooltipOn">
              {{ hash }}
              <svg-icon name="copy" />
            </button>
          </template>
        </swap-copy-wrapper>
      </form-indent>

      <form-indent v-if="status" title="Status">
        <span :class="{ 'transaction-details__send-status': status === 'send' }">
          {{ status }}
          <pending-loader v-if="status === 'pending'" />
        </span>
      </form-indent>

      <v-divider class="transaction-details__divider"></v-divider>

      <transaction-details-entry :wallet="`Default ${minifiedWallet}`" value="0.9301" />

      <show-more-details
        :entries="entries"
        :decimal="decimal"
        :current-decimal="currentDecimal"
        :journal="journal"
      ></show-more-details>

      <v-divider class="transaction-details__divider"></v-divider>

      <transaction-details-entry wallet="Default" title="Transaction fee:" :value="fee" />
    </div>
  </modal-wrapper>
</template>

<script>
import { mapMutations } from 'vuex'
import { ADD_MODAL } from '@/store/modules/Modals'
import { MODULE_NAME as TRANSACTIONS_MODULE } from '@/store/modules/Transactions'
import { EDIT_FEE, SHARE_MODAL } from '@/store/modules/Modals/names'
import { minifyAddress } from '@/utils/common'

import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import FormIndent from '@/components/UI/Forms/Indent.vue'

import ShowMoreDetails from '@/components/Wallets/ShowMoreDetails.vue'
import PendingLoader from '@/components/Loaders/VLoaderDots.vue'
import TransactionDetailsEntry from '@/components/Wallets/Transactions/TransactionDetailsEntry.vue'

export default {
  name: 'TransactionDetails',
  inject: ['mediaQueries'],
  components: {
    ModalWrapper,
    FormIndent,
    ShowMoreDetails,
    PendingLoader,
    TransactionDetailsEntry
  },
  props: {
    hash: { type: String, required: true },
    status: { type: String, default: 'pending' },
    fee: { type: [Number, String], required: true },
    decimal: { type: Number, default: 1 },
    currentDecimal: { type: Number, default: 1 },
    entries: { type: Array, default: () => [] },
    journal: { type: Array, default: () => [] }
  },
  data() {
    return {
      editFee: false,
      currentFee: 0,
      wallet: '0x912fD21d7a69678227fE6d08C64222Db41477bA0'
    }
  },
  computed: {
    storeFee() {
      return this.$store.state[TRANSACTIONS_MODULE].model
    },
    wasEditFee() {
      return this.fee === this.currentFee
    },
    minifiedWallet() {
      return minifyAddress(this.wallet)
    }
  },
  watch: {
    storeFee: {
      handler(val) {
        this.currentFee = val
      }
    }
  },
  methods: {
    ...mapMutations({
      mutationAddModal: ADD_MODAL
    }),
    close() {
      this.$emit('close')
    },
    share() {
      this.mutationAddModal({
        name: SHARE_MODAL,
        info: {
          data: this.hash,
          type: 'transaction'
        }
      })
      this.$emit('close')
    },
    editFeeShow() {
      if (!this.mediaQueries.desktop) {
        this.mutationAddModal({
          name: EDIT_FEE,
          info: {
            sliderParams: this.sliderParams,
            recommendedFee: +this.recommendedFee,
            fee: +this.fee
          }
        })
      } else {
        this.editFee = true
      }
    }
  }
}
</script>

<style lang="scss">
.transaction-details {
  &__copy-button {
    width: auto;
    outline: none;
    color: var(--primary-text);
    font-size: $--font-size-extra-small-subtitle;
    padding: 4px 0;
    word-break: break-all;
    text-align: left;
    transition: 0.3s;
    &:hover {
      background: var(--main-button-background);
    }
    svg {
      margin-bottom: -3px;
      margin-left: 5px;
      width: 16px;
      height: 16px;
    }
  }
  &__results {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
  }
  &__divider {
    margin: 16px 0;
  }
  &__edit-icon {
    height: 11px;
    width: 11px;
  }
  &__fee {
    display: flex;
    align-items: center;
    line-height: 21px;
  }
  &__currency-name {
    color: $--dark-grey;
  }
  &__send-status {
    color: $--green;
  }
}
</style>
