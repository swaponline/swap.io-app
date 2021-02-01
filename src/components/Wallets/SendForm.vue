<template>
  <form-wrapper value persistent class="send-form" @input="close">
    <form class="send-form__form" @submit.prevent="submit">
      <v-row>
        <h3 class="send-form__subtitle">
          <span>Send Form</span>
          <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
        </h3>

        <form-text-field v-if="address" :value="address" disabled label="Your wallet">
          <template #append>
            <v-icon>mdi-bitcoin</v-icon>
          </template>
        </form-text-field>
        <form-selector
          v-else
          v-model="selectAddress"
          :items="wallets"
          item-text="address"
          item-value="address"
          label="Your wallet"
          outlined
        >
        </form-selector>

        <h3 class="send-form__subtitle">
          <span>Balance: 2312 BTC</span>
        </h3>

        <form-text-field
          v-if="feeEdit"
          v-model="commission"
          :hint="'Рекомендуемая комиссия: ' + recommendedCommission"
          label="Transition fee"
        >
        </form-text-field>

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

        <span class="send-form__results">
          <span>Transaction fee: </span>
          <span class="send-form__fee">
            <v-btn icon small @click="feeEdit = true">
              <svg-icon class="send-form__edit-icon" name="edit"></svg-icon>
            </v-btn>
            <span>${{ commission }}</span>
          </span>
        </span>
      </v-row>

      <v-row>
        <span class="send-form__results">
          <span>Total balance change: </span>
          <span class="send-form__amount">
            BTC {{ recipient.amount }}
            <span>~$21</span>
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
import FormWrapper from '../FormWrapper.vue'
import FormTextField from '../FormTextField.vue'
import FormSelector from '../FormSelector.vue'

export default {
  name: 'SendForm',
  components: {
    FormWrapper,
    FormTextField,
    FormSelector
  },
  data() {
    return {
      commission: 0.545,
      recommendedCommission: 0.545,
      recipient: [{ wallet: null, amount: null }],
      multipleRecepients: false,
      feeEdit: false,
      listRecipient: '',
      selectAddress: null
    }
  },
  beforeRouteLeave(to, from, next) {
    Object.assign(to.meta, { back: true })
    next()
  },
  computed: {
    wallets() {
      return this.$store.getters.siblingList
    },
    address() {
      return this.$route.params.walletAddress
    },
    siblingList() {
      return this.$store.getters.siblingList
    },
    currentWallet() {
      if (this.address && this.siblingList) {
        return this.siblingList.find(el => el.address === this.address)
      }
      return {}
    },
    maxAmount() {
      return (this.currentWallet.value * 10 ** 18 - this.commission * 10 ** 18) / 10 ** 18
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
    submit() {
      this.close()
    },
    close() {
      this.$emit('close')
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
      padding: 0 10px 20px;
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
  &__long-field {
    flex-grow: 0;
    width: 70%;
    @include phone {
      width: 100%;
    }
  }
  &__short-field {
    width: 30%;
    @include phone {
      width: 80%;
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
    span {
      font-size: $--font-size-medium;
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
    margin: 15px 0 25px;
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
    span {
      font-size: $--font-size-small;
      line-height: 16px;
    }
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
}
</style>
