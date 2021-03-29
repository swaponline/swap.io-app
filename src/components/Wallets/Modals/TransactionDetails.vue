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
        <v-tooltip v-model="copyHashTooltip.value" top :open-on-hover="false">
          <template #activator="{ on }">
            <button class="transaction-details__copy-button" @click="copy">
              {{ hash }}
              <svg-icon name="copy" v-on="on" />
            </button>
          </template>
          <span>Copied</span>
        </v-tooltip>
      </form-indent>

      <form-indent v-if="status" title="Status">
        <span :class="{ 'transaction-details__send-status': status === 'send' }">
          {{ status }}
          <pending-loader v-if="status === 'pending'" />
        </span>
      </form-indent>

      <show-more-details
        :entries="entries"
        :decimal="decimal"
        :current-decimal="currentDecimal"
        :journal="journal"
      ></show-more-details>

      <v-divider class="transaction-details__divider"></v-divider>

      <span class="transaction-details__results">
        <span class="mr-5 align-self-center">Transaction fee: </span>

        <slider-fee
          v-if="editFee"
          v-model="currentFee"
          :recommended-fee="recommendedFee"
          v-bind="sliderParams"
        ></slider-fee>

        <span v-else class="transaction-details__fee">
          <v-btn v-if="status === 'pending'" icon small @click="editFeeShow">
            <svg-icon class="transaction-details__edit-icon" name="edit"></svg-icon>
          </v-btn>
          <span>
            <span class="transaction-details__currency-name">USD </span>
            {{ fee }}
          </span>
        </span>
      </span>

      <span class="transaction-details__results">
        <span class="mr-5 align-self-center">Total balance change: </span>
        <span class="transaction-details__fee">
          <span>
            <span class="transaction-details__currency-name">USD </span>
            {{ fee }}
          </span>
        </span>
      </span>
    </div>
  </modal-wrapper>
</template>

<script>
import { mapMutations } from 'vuex'
import { ADD_MODAL } from '@/store/modules/Modals'
import { MODULE_NAME as TRANSACTIONS_MODULE } from '@/store/modules/Transactions'
import { EDIT_FEE, SHARE_MODAL } from '@/store/modules/Modals/names'
import Copy from '@/utils/copy'

import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import FormIndent from '@/components/UI/Forms/Indent.vue'
import SliderFee from '@/components/Wallets/SliderFee.vue'
import ShowMoreDetails from '@/components/Wallets/ShowMoreDetails.vue'
import PendingLoader from '@/components/Loader.vue'

export default {
  name: 'TransactionDetails',
  inject: ['mediaQueries'],
  components: {
    ModalWrapper,
    FormIndent,
    ShowMoreDetails,
    SliderFee,
    PendingLoader
  },
  props: {
    hash: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'pending'
    },
    fee: {
      type: [Number, String],
      required: true
    },
    decimal: {
      type: Number,
      default: 1
    },
    currentDecimal: {
      type: Number,
      default: 1
    },
    entries: {
      type: Array,
      default: () => []
    },
    journal: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      sliderParams: {
        min: 0.1,
        max: 1,
        step: 0.001
      },
      recommendedFee: 0.545,
      copyHashTooltip: {
        value: false,
        timer: 0
      },
      editFee: false,
      currentFee: 0
    }
  },
  computed: {
    storeFee() {
      return this.$store.state[TRANSACTIONS_MODULE].model
    },
    wasEditFee() {
      return this.fee === this.currentFee
    }
  },
  watch: {
    storeFee: {
      handler(val) {
        this.currentFee = val
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.copyHashTooltip.timer)
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
    copy() {
      Copy(this.hash)
        .then(() => {
          this.copyHashTooltip.value = true
          if (this.copyHashTooltip.timer) {
            clearTimeout(this.copyHashTooltip.timer)
          }
          this.copyHashTooltip.timer = setTimeout(() => {
            this.copyHashTooltip.value = false
          }, 1500)
        })
        .catch(err => {
          console.log('Значение не скопировано', err)
        })
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
    color: $--black;
    font-size: $--font-size-extra-small-subtitle;
    padding: 4px 0;
    word-break: break-all;
    text-align: left;
    transition: 0.3s;
    &:hover {
      background: $--light-grey;
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
    margin-bottom: 25px;
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
