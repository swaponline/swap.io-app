<template>
  <modal-wrapper
    :value="value"
    confirm-button-label="Send"
    :title="step === 1 ? 'Send' : 'Confirm send'"
    :back-icon="step === 2"
    @input="hide"
    @submit="submit"
    @cancel="close"
  >
    <div v-if="step === 1" class="send-form">
      <wallet-selector v-model="selectedWallet" :items="wallets" class="mb-10" />

      <div class="send-form__toggle-wrapper">
        <div
          class="send-form__toggle"
          :class="{ 'send-form__toggle--active': !isMultipleRecepients }"
          @click="isMultipleRecepients = !isMultipleRecepients"
        >
          Single recipient
        </div>
        <div
          class="send-form__toggle"
          :class="{ 'send-form__toggle--active': isMultipleRecepients }"
          @click="isMultipleRecepients = !isMultipleRecepients"
        >
          Multiple recipients
        </div>
      </div>

      <v-textarea
        v-if="isMultipleRecepients"
        v-model="listRecipient"
        outlined
        :hint="listRecipientHint"
        hide-details
        class="send-form__textarea rounded-lg"
        placeholder="Enter a list of outputs in the 'Pay to' field.
  One output per line.
  Format: address, amount"
      ></v-textarea>

      <div v-else class="d-flex">
        <form-text-field
          v-model="recipients[0].address"
          required
          label="Send to"
          class="send-form__long-field"
        ></form-text-field>

        <form-text-field
          v-model="recipients[0].amount"
          :max="maxAmount"
          type="number"
          step="any"
          min="0"
          class="send-form__short-field"
          required
          label="Amount"
        >
        </form-text-field>
      </div>

      <template v-if="selectedWallet">
        <div class="send-form__fee-wrapper">
          <div class="send-form__fee-row" @click="editFeeShow">
            <span>Transaction fee: </span>

            <form-text-field v-model="fee" class="send-form__fee-input" @click.stop />
          </div>

          <slider-fee
            v-if="isEditingFee"
            v-model="fee"
            :recommended-fee="recommendedFee"
            v-bind="sliderParams"
            class="send-form__slider"
            @click.stop
          />
        </div>

        <div class="send-form__result-row">
          <span>Total balance change:</span>
          <span class="send-form__amount">
            <span>
              <span class="send-form__currency-name">{{ selectedWallet.coin }}</span>
              {{ totalBalanceChange }}
            </span>
            <span class="send-form__amount-fiat">
              <span class="grey--text">~USD</span> {{ totalConvertedBalanceChange }}
            </span>
          </span>
        </div>

        <v-divider class="send-form__divider" />

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <swap-button v-if="!hasMemo" small class="send-form__add-memo" @click="hasMemo = true" v-on="on">
              <v-icon color="grey lighten-1" small class="mr-1">mdi-bookmark</v-icon>Add a memo
            </swap-button>
          </template>
          <span>You will see it in the tx history (not the recipient)</span>
        </v-tooltip>

        <v-textarea
          v-if="hasMemo"
          v-model="memo"
          class="send-form__textarea rounded-lg"
          label="Memo"
          hide-details
          color="grey"
          auto-grow
          rows="1"
        ></v-textarea>
      </template>
    </div>

    <send-preview v-if="step === 2" :wallet="selectedWallet" :fee="fee" :recipients="recipients" :memo="memo" />
  </modal-wrapper>
</template>

<script>
import { mapMutations } from 'vuex'
import { ADD_MODAL } from '@/store/modules/Modals'
import { EDIT_FEE } from '@/store/modules/Modals/names'
import { MODULE_NAME as TRANSACTIONS_MODULE } from '@/store/modules/Transactions'
import { convertAmountToOtherCurrency } from '@/services/converter'
import { walletsService, events } from '@/services/wallets'

import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import FormTextField from '@/components/UI/Forms/TextField.vue'
import SliderFee from '@/components/Wallets/SliderFee.vue'
import WalletSelector from '@/components/Wallets/WalletSelector.vue'
import SendPreview from './Preview.vue'

export default {
  name: 'SendForm',
  inject: ['mediaQueries'],
  components: { ModalWrapper, FormTextField, SliderFee, WalletSelector, SendPreview },
  props: {
    value: { type: Boolean, required: true },
    address: { type: String, default: '' },
    coin: { type: String, default: '' },
    networkId: { type: String, default: '' }
  },
  data() {
    return {
      sliderParams: {
        min: 0.1,
        max: 1,
        step: 0.001
      },
      fee: 0.545,
      recommendedFee: 0.545,
      recipients: [{ address: null, amount: null }],
      isMultipleRecepients: false,
      isEditingFee: false,
      listRecipient: '',
      selectedWallet: null,
      hasMemo: false,
      memo: '',
      step: 1,
      wallets: walletsService.getCurrentWallets(),
      subscriptions: []
    }
  },
  computed: {
    storeFee() {
      return this.$store.state[TRANSACTIONS_MODULE].model.fee
    },
    maxAmount() {
      return this.selectedWallet && (this.selectedWallet.value * 10 ** 18 - this.fee * 10 ** 18) / 10 ** 18
    },
    multipleAmountSum() {
      const field = `${this.listRecipient} `
      const arr = [...field.matchAll(/,\s*\d+\.?\d*\s/g)]
      return arr.reduce((acc, el) => {
        const amount = el[0].slice(1).trim()
        return acc + +amount
      }, 0)
    },
    listRecipientHint() {
      const balance = this.maxAmount - this.multipleAmountSum
      return `Balance: ${balance}`
    },
    totalBalanceChange() {
      return (this.isMultipleRecepients ? this.multipleSum : this.recipients[0].amount) || '0'
    },
    totalConvertedBalanceChange() {
      return convertAmountToOtherCurrency(this.totalBalanceChange, this.selectedWallet.coin, 'USD')
    }
  },
  watch: {
    storeFee: {
      handler(val) {
        this.fee = val
      }
    }
  },
  created() {
    if (this.address && this.wallets) {
      this.selectedWallet = this.wallets.find(
        wallet =>
          wallet.address === this.address &&
          wallet.coin.toLowerCase() === this.coin.toLowerCase() &&
          wallet.networkId.toLowerCase() === this.networkId.toLowerCase()
      )
    }

    this.subscriptions.push(
      walletsService.subscribe(events.REFRESH_CURRENT_WALLETS, wallets => {
        this.wallets = wallets
      })
    )
  },

  beforeDestroy() {
    this.subscriptions.forEach(callback => callback.unsubscribe())
  },
  methods: {
    ...mapMutations({
      mutationAddModal: ADD_MODAL
    }),
    submit() {
      if (this.step === 1) {
        if (this.isMultipleRecepients) {
          this.recipients = this.getRecipients()
        }
        this.step = 2
        return
      }
      if (this.step === 2) {
        this.$emit('close-all')
      }
    },
    close() {
      if (this.step === 2) {
        this.step = 1
      } else {
        this.$emit('close')
        this.resetState()
      }
    },
    hide() {
      this.$emit('toggle', false)
      this.resetState()
    },
    resetState() {
      if (!this.address) {
        this.selectedWallet = null
      }
      this.listRecipient = ''
      this.fee = 0.545
      this.recipients = [{ address: null, amount: null }]
      this.isMultipleRecepients = false
      this.isEditingFee = false
      this.hasMemo = false
      this.memo = ''
      this.step = 1
    },
    editFeeShow() {
      if (this.isEditingFee) {
        this.isEditingFee = false
        return
      }
      if (!this.mediaQueries.desktop) {
        this.mutationAddModal({
          name: EDIT_FEE,
          info: {
            sliderParams: this.sliderParams,
            recommendedFee: this.recommendedFee,
            fee: this.fee
          }
        })
      } else {
        this.isEditingFee = true
      }
    },
    getRecipients() {
      const fields = [...this.listRecipient.matchAll(/.+,\s*\d+\.?\d*/g)]
      return fields.reduce((acc, el) => {
        const address = el[0].slice(0, el[0].indexOf(',') - 1)
        const amount = +el[0].slice(el[0].indexOf(',') + 1)
        acc.push({ address, amount })
        return acc
      }, [])
    }
  }
}
</script>

<style lang="scss">
.send-form {
  &__toggle-wrapper {
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    padding: 3px;
    border-radius: $--main-border-radius;
    background-color: get-theme-for($background, 'secondary');
  }
  &__toggle {
    width: 50%;
    padding: 10px;
    border-radius: $--main-border-radius;
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.3s;
    cursor: pointer;

    &--active {
      background-color: get-theme-for($background, 'primary');
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
    }
  }

  &__long-field {
    flex-grow: 1;
    width: 65%;
  }
  &__short-field {
    flex-grow: 0;
    width: 35%;
    margin-left: 8px !important;
  }
  &__textarea {
    padding: 14px 12px;
    margin: 0 0 20px !important;
    font-size: $--font-size-extra-small-subtitle;
    flex-grow: 0;
    border: 2px solid $--border-grey;

    --color-fieldset: $--black;
    &:focus-within {
      --color-fieldset: var(--main-color);
    }
    .v-input__slot {
      margin-bottom: 0;
      &:before,
      &:after {
        display: none;
      }
    }
    fieldset {
      color: var(--color-fieldset) !important;
      border: none !important;
      legend {
        width: 0 !important;
      }
    }
  }

  &__edit-icon {
    height: 11px;
    width: 12px;
  }
  &__divider {
    margin-bottom: 25px;
  }
  &__fee-wrapper {
    margin-bottom: 30px;
    line-height: 21px;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
    background-color: get-theme-for($background, 'secondary');
    padding: 8px 8px 8px 12px;
    color: get-theme-for($text, 'secondary');
    border-radius: $--main-border-radius;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: get-theme-for($button, 'primary', 'hover');
    }
  }
  &__fee-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__fee-input {
    max-width: 130px;
    min-height: 40px;
    margin-bottom: 0 !important;
  }
  &__result-row {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 21px;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
    color: get-theme-for($text, 'secondary');
  }
  &__amount {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: get-theme-for($text, 'primary');
    font-size: $--font-size-extra-small-subtitle;
  }
  &__amount-fiat {
    font-size: $--font-size-medium;
    line-height: 16px;
  }
  &__currency-name {
    color: get-theme-for($text, 'secondary');
  }
  &__add-memo {
    margin-bottom: 30px;
    padding: 0 8px !important;
    font-size: $--font-size-small !important;
  }
}
</style>
