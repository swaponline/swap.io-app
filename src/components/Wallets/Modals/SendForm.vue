<template>
  <form-wrapper value persistent class="send-form" @input="close">
    <form class="send-form__form" @submit.prevent="submit">
      <v-row>
        <h3 class="send-form__subtitle">
          <span>Send Form</span>
          <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
        </h3>

        <p v-if="selectAddress" class="send-form__indent">
          <span class="send-form__indent-title">Wallet ID:</span>
          <span>{{ selectAddress }}</span>
        </p>

        <p v-if="selectAddress" class="send-form__indent mb-8">
          <span class="send-form__indent-title">Wallet balance:</span>
          <span>39 BTC</span>
        </p>

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

        <v-row v-if="multipleRecepients" class="send-form__row">
          <v-textarea
            v-model="listRecipient"
            outlined
            :hint="'Остаток: ' + (maxAmount - regexpSumm)"
            class="send-form__multiple-list rounded-lg"
            placeholder="Enter a list of outputs in the 'Pay to' field.
  One output per line.
  Format: address, amount"
          ></v-textarea>
        </v-row>

        <v-row v-else class="send-form__row">
          <form-text-field
            v-model="recipient.wallet"
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
        </v-row>

        <v-btn
          class="send-form__multiple-button px-0"
          color="blue"
          text
          @click="multipleRecepients = !multipleRecepients"
        >
          <span class="text-left flex-grow-1">{{
            multipleRecepients ? 'Single recipient' : 'Multple recipients'
          }}</span>
        </v-btn>

        <v-divider class="mx-2"></v-divider>

        <span class="send-form__results mt-6 mb-4">
          <span class="mr-5 align-self-center">Transaction fee: </span>

          <slider-fee v-if="editFee" v-model="fee" :recommended-fee="recommendedFee" v-bind="sliderParams"></slider-fee>

          <span v-else class="send-form__fee">
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
      </v-row>

      <v-row>
        <span class="send-form__results mb-6">
          <span>Total balance change: </span>
          <span class="send-form__amount">
            <span><span class="send-form__currency-name">BTC</span> {{ recipient.amount }}</span>
            <span class="send-form__amount-fiat"><span class="send-form__currency-name">~USD</span> 21</span>
          </span>
        </span>
      </v-row>

      <v-row class="mt-auto">
        <v-btn class="send-form__button" depressed type="button" @click="close">Cancel</v-btn>
        <v-btn class="send-form__button" depressed type="submit">Send</v-btn>
      </v-row>
    </form>
  </form-wrapper>
</template>

<script>
import { ADD_MODAL } from '@/store/modules/Modals'
import { EDIT_FEE, SEND_PREVIEW } from '@/store/modules/Modals/names'

import { mapMutations } from 'vuex'
import FormWrapper from '../../FormWrapper.vue'
import FormTextField from '../../FormTextField.vue'
import FormSelector from '../../FormSelector.vue'
import SliderFee from '../SliderFee.vue'

export default {
  name: 'SendForm',
  inject: ['mediaQueries'],
  components: {
    FormWrapper,
    FormTextField,
    FormSelector,
    SliderFee
  },
  props: {
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
      recipient: { wallet: null, amount: null },
      multipleRecepients: false,
      editFee: false,
      listRecipient: '',
      selectAddress: null
    }
  },
  computed: {
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
      console.log((this.currentWallet.value * 10 ** 18 - this.fee * 10 ** 18) / 10 ** 18)
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
  created() {
    this.selectAddress = this.address
  },
  methods: {
    ...mapMutations({
      mutationAddModal: ADD_MODAL
    }),
    submit() {
      this.mutationAddModal({
        name: SEND_PREVIEW,
        info: {
          fee: this.fee,
          recipient: this.recipient,
          listRecipient: this.listRecipient,
          address: this.selectAddress,
          multipleRecepients: this.multipleRecepients
        }
      })
    },
    close() {
      this.$emit('close')
    },
    editFeeShow() {
      if (!this.mediaQueries.desktop) {
        this.mutationAddModal({
          name: EDIT_FEE,
          info: {
            sliderParams: this.sliderParams,
            recommendedFee: this.recommendedFee,
            fee: this.fee,
            action: e => {
              this.fee = e
            }
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
.send-form {
  &__form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 25px 50px 40px;
    min-height: calc(var(--vh, 1vh) * 100);

    @include tablet {
      padding: 24px;
    }
    @include phone {
      padding: 12px;
    }
    .row {
      flex-grow: 0;
    }
  }
  &__row {
    width: 100%;
    margin: 0 0 !important;
    flex-wrap: nowrap;
    @include phone {
      flex-wrap: wrap;
    }
  }
  &__subtitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 8px 25px;
    width: 100%;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-small-subtitle;
  }
  &__indent {
    width: 100%;
    margin: 8px;
    color: $--black;
    font-size: $--font-size-medium;
    span {
      display: block;
    }
  }
  &__indent-title {
    color: $--grey;
  }
  &__long-field {
    flex-grow: 0;
    width: 65%;
    @include phone {
      margin: 0 5px 25px;
      width: calc(65% - 10px);
    }
  }
  &__short-field {
    width: 35%;
    @include phone {
      margin: 0 5px 25px;
      width: calc(35% - 10px);
    }
  }
  &__multiple-list {
    margin: 0 8px 0 !important;
    font-size: $--font-size-extra-small-subtitle;

    --color-fieldset: $--black;
    &:focus-within {
      --color-fieldset: $--blue;
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
    font-weight: $--font-weight-bold;
    text-transform: none;
    flex-grow: 0;
    margin: 0 8px 35px;
    width: calc(100% - 16px);
    :last-child {
      font-size: $--font-size-medium;
      line-height: 16px;
    }
  }
  &__edit-icon {
    height: 11px;
    width: 11px;
  }
  &__results {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 8px;
    flex-grow: 1;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
  }
  &__fee {
    display: flex;
    align-items: center;
    line-height: 21px;
  }
  &__amount {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
  }
  &__amount-fiat {
    font-size: $--font-size-small;
    line-height: 16px;
  }
  &__button {
    width: calc(50% - 16px);
    border-radius: 8px;
    margin: auto 8px;
    min-height: 52px;
    text-transform: none;
    font-weight: $--font-weight-bold;
    span {
      font-size: $--font-size-medium;
    }
  }
  &__currency-name {
    color: $--dark-grey;
  }
}
</style>
