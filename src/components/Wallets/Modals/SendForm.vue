<template>
  <modal-wrapper
    :value="value"
    confirm-button-label="Send"
    title="Send form"
    @input="hide"
    @submit="submit"
    @cancel="close"
  >
    <div class="send-form">
      <form-indent v-if="selectAddress" title="Wallet ID:" :text="selectAddress" />

      <form-indent v-if="selectAddress" title="Wallet balance:" :text="'39 BTC'" />

      <form-selector
        v-if="!address"
        v-model="selectAddress"
        :items="wallets"
        item-text="address"
        item-value="address"
        label="Your wallet"
        outlined
      >
      </form-selector>

      <v-textarea
        v-if="multipleRecepients"
        v-model="listRecipient"
        outlined
        :hint="'Остаток: ' + (maxAmount - regexpSumm)"
        class="send-form__multiple-list rounded-lg"
        placeholder="Enter a list of outputs in the 'Pay to' field. 
  One output per line. 
  Format: address, amount"
      ></v-textarea>

      <div v-else class="d-flex">
        <form-text-field
          v-model="recipient.address"
          required
          label="Send to"
          class="send-form__long-field"
        ></form-text-field>

        <form-text-field
          v-model="recipient.amount"
          :max="maxAmount"
          type="number"
          step="any"
          min="0"
          class="send-form__short-field"
          :hint="'max: ' + maxAmount"
          required
          label="Amount"
        >
        </form-text-field>
      </div>

      <v-btn class="send-form__multiple-button" color="blue" text @click="multipleRecepients = !multipleRecepients">
        <span class="text-left flex-grow-1">{{ multipleRecepients ? 'Single recipient' : 'Multple recipients' }}</span>
      </v-btn>

      <v-divider class="send-form__divider"></v-divider>

      <span class="send-form__result-row">
        <span>Transaction fee: </span>

        <slider-fee
          v-if="editFee"
          v-model="fee"
          :recommended-fee="recommendedFee"
          v-bind="sliderParams"
          class="send-form__slider"
        ></slider-fee>

        <span v-else>
          <v-btn icon small @click="editFeeShow">
            <svg-icon class="send-form__edit-icon" name="edit"></svg-icon>
          </v-btn>

          <v-tooltip top>
            <template #activator="{on}">
              <span v-on="on"> <span class="send-form__currency-name">USD </span>{{ fee }} </span>
            </template>
            <span>Recommended fee</span>
          </v-tooltip>
        </span>
      </span>

      <span class="send-form__result-row">
        <span>Total balance change: </span>
        <span class="send-form__amount">
          <span><span class="send-form__currency-name">BTC</span> {{ recipient.amount }}</span>
          <span class="send-form__amount-fiat"><span class="send-form__currency-name">~USD</span> 21</span>
        </span>
      </span>
    </div>
  </modal-wrapper>
</template>

<script>
import { mapMutations } from 'vuex'
import { ADD_MODAL } from '@/store/modules/Modals'
import { EDIT_FEE, SEND_PREVIEW } from '@/store/modules/Modals/names'
import { MODULE_NAME as TRANSACTIONS_MODULE } from '@/store/modules/Transactions'

import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import FormTextField from '@/components/UI/Forms/TextField.vue'
import FormSelector from '@/components/UI/Forms/Selector.vue'
import FormIndent from '@/components/UI/Forms/Indent.vue'
import SliderFee from '../SliderFee.vue'

export default {
  name: 'SendForm',
  inject: ['mediaQueries'],
  components: {
    ModalWrapper,
    FormTextField,
    FormSelector,
    SliderFee,
    FormIndent
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    address: {
      type: String,
      default: ''
    }
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
      recipient: { address: null, amount: null },
      multipleRecepients: false,
      editFee: false,
      listRecipient: '',
      selectAddress: null
    }
  },
  computed: {
    storeFee() {
      return this.$store.state[TRANSACTIONS_MODULE].model.fee
    },
    wallets() {
      return this.$store.getters.siblingList
    },
    currentWallet() {
      if (this.address && this.wallets) {
        return this.wallets.find(el => el.address === this.address)
      }
      return {}
    },
    maxAmount() {
      return (this.currentWallet.value * 10 ** 18 - this.fee * 10 ** 18) / 10 ** 18
    },
    regexpSumm() {
      const field = `${this.listRecipient} `
      const arr = [...field.matchAll(/,\s*\d+\.?\d*\s/g)]
      return arr.reduce((acc, el) => {
        const amount = el[0].slice(1).trim()
        return acc + +amount
      }, 0)
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
    this.selectAddress = this.address
  },
  methods: {
    ...mapMutations({
      mutationAddModal: ADD_MODAL
    }),
    submit() {
      const recipients = this.multipleRecepients ? this.getRecipients() : [this.recipient]
      this.mutationAddModal({
        name: SEND_PREVIEW,
        info: {
          fee: this.fee,
          recipient: this.recipient,
          listRecipient: this.listRecipient,
          address: this.selectAddress,
          multipleRecepients: this.multipleRecepients,
          recipients
        }
      })
    },
    close() {
      this.$emit('close')
    },
    hide() {
      this.$emit('toggle', false)
    },
    editFeeShow() {
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
        this.editFee = true
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
  &__long-field {
    flex-grow: 1;
    width: 65%;
  }
  &__short-field {
    flex-grow: 0;
    width: 35%;
    margin-left: 16px !important;
    @include phone {
      margin-left: 8px !important;
    }
  }
  &__multiple-list {
    margin: 0 0 !important;
    font-size: $--font-size-extra-small-subtitle;
    flex-grow: 0;

    --color-fieldset: $--black;
    &:focus-within {
      --color-fieldset: $--blue;
    }
    .v-input__slot {
      margin-bottom: 0;
    }
    fieldset {
      color: var(--color-fieldset) !important;
      border-width: 1px !important;
      legend {
        width: 0 !important;
      }
    }
  }
  &__multiple-button {
    height: auto !important;
    font-weight: $--font-weight-bold;
    text-transform: none;
    flex-grow: 0;
    padding: 0 0 !important;
    margin-bottom: 25px;
    width: 100%;
    span {
      letter-spacing: 0.01em;
      color: $--purple;
      font-size: $--font-size-medium;
    }
  }
  &__edit-icon {
    height: 11px;
    width: 12px;
  }
  &__divider {
    margin-bottom: 25px;
  }
  &__result-row {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 21px;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
  }
  &__amount {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  &__amount-fiat {
    font-size: $--font-size-small;
    line-height: 16px;
  }
  &__currency-name {
    color: $--dark-grey;
  }
}
</style>
