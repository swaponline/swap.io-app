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
      <form-indent title="Transaction hash:">
        <swap-copy-button :value="transaction.hash" :label="transaction.hash" />
      </form-indent>

      <form-indent v-if="status" title="Status">
        <span v-if="isPending">pending<pending-loader /></span>
        <span v-else class="transaction-details__send-status">success</span>
      </form-indent>

      <v-divider class="transaction-details__divider"></v-divider>

      <transaction-details-entry
        v-for="(entry, i) in entriesCurrentWallet"
        :key="i"
        v-bind="entry"
        :wallet="minifyAddress(entry.wallet)"
      />

      <show-more-details :entries="entriesOtherWallet">
        <template #actions>
          <swap-copy-wrapper>
            <template #default="{ copy, tooltipOn }">
              <swap-button
                small
                class="transaction-details__copy-entry"
                v-on="tooltipOn"
                @click.stop="copy(JSON.stringify(transaction))"
              >
                <svg-icon class="transaction-details__copy-entry-icon" name="copy" />Copy
              </swap-button>
            </template>
          </swap-copy-wrapper>
        </template>
      </show-more-details>

      <v-divider class="transaction-details__divider"></v-divider>

      <template v-if="isEditingFee">
        <fee-edit-gas
          v-if="checkGasFee(editableEntry.currency)"
          :gas="transaction.gas_used"
          :gas-price="transaction.gas_price"
          :decimals="editableEntry.decimals"
          :currency="editableEntry.currency"
          @save-fee="updateTransactionFee"
        />
        <fee-edit-value
          v-else
          :decimals="editableEntry.decimals"
          :currency="editableEntry.currency"
          :fee="editableEntry.value"
          @save-fee="updateTransactionFee"
        />
      </template>

      <template v-else>
        <transaction-details-entry
          v-for="(fee, i) in feeCurrentWallet"
          :key="`fee-${i}`"
          v-bind="fee"
          wallet="Default"
          :editable="isPending"
          @edit-entry="toggleEditableFee(true, fee)"
        />
      </template>
    </div>
  </modal-wrapper>
</template>

<script>
import { mapMutations } from 'vuex'
import { ADD_MODAL } from '@/store/modules/Modals'
import { SHARE_MODAL } from '@/store/modules/Modals/names'
import { minifyAddress } from '@/utils/common'
import { TRANSACTION_PENDING } from '@/constants/transactionStatus'

import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import FormIndent from '@/components/UI/Forms/Indent.vue'

import ShowMoreDetails from '@/components/Wallets/ShowMoreDetails.vue'
import PendingLoader from '@/components/Loaders/VLoaderDots.vue'
import TransactionDetailsEntry from '@/components/Wallets/Transactions/TransactionDetailsEntry.vue'
import FeeEditValue from '@/components/Wallets/Transactions/FeeEditValue.vue'
import FeeEditGas from '@/components/Wallets/Transactions/FeeEditGas.vue'

const ETH_CURRENCY = 'ETH'

export default {
  name: 'TransactionDetails',
  components: {
    ModalWrapper,
    FormIndent,
    ShowMoreDetails,
    PendingLoader,
    TransactionDetailsEntry,
    FeeEditValue,
    FeeEditGas
  },
  props: {
    currentWallet: { type: String, default: '' },
    transaction: { type: Object, required: true },
    status: { type: String, default: TRANSACTION_PENDING }
  },
  data() {
    return {
      isEditingFee: false,
      editableEntry: null
    }
  },
  computed: {
    isPending() {
      return this.status === TRANSACTION_PENDING
    },
    allEntries() {
      return this.transaction.journal.reduce((entries, item) => {
        const newEntries = item.entries.map(entry => {
          const { symbol, ...assets } = item.asset
          return { ...assets, currency: symbol, ...entry }
        })

        return [...entries, ...newEntries]
      }, [])
    },
    feeCurrentWallet() {
      return this.allEntries.filter(entry => entry.wallet === this.currentWallet && entry.label === 'Transaction fee')
    },
    entriesCurrentWallet() {
      return this.allEntries.filter(entry => entry.wallet === this.currentWallet && entry.label !== 'Transaction fee')
    },
    entriesOtherWallet() {
      return this.allEntries.filter(entry => entry.wallet !== this.currentWallet)
    }
  },
  methods: {
    minifyAddress,
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
          data: { value: this.transaction.hash, label: 'Hash' },
          shareUrl: `${window.location.origin}/transaction/${this.transaction.hash}`
        }
      })
    },
    toggleEditableFee(value, entry) {
      this.isEditingFee = value
      this.editableEntry = entry
    },
    updateTransactionFee() {
      this.toggleEditableFee(false, null)
    },
    checkGasFee(currency) {
      return currency === ETH_CURRENCY
    }
  }
}
</script>

<style lang="scss">
.transaction-details {
  &__divider {
    margin: 16px 0;
  }

  &__send-status {
    color: $--green;
  }

  &__copy-entry {
    letter-spacing: initial;
    margin-left: 8px;
    flex-grow: 0;

    .v-btn__content {
      font-size: $--font-size-extra-small;
    }
  }

  &__copy-entry-icon {
    width: 11px;
    height: 11px;
    margin-right: 5px;
  }
}
</style>
