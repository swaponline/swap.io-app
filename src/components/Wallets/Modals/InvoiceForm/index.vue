<template>
  <modal-wrapper
    :value="value"
    :title="step === 1 ? 'Invoice' : 'Confirm invoice'"
    :back-icon="step === 2"
    @input="hide"
    @submit="submit"
    @cancel="close"
  >
    <div v-if="step === 1" class="invoice-form">
      <wallet-selector v-model="selectedWallet" :items="wallets" class="invoice-form__wallet-selector" />

      <form-text-field v-model="contact" color="grey" required label="Bill to" class="mb-8" />

      <h3 class="invoice-form__subtitle">Invoice Items</h3>

      <div class="d-flex invoice-form__selectors">
        <v-select
          v-model="invoiceType"
          return-object
          item-text="label"
          item-value="id"
          class="invoice-form__long-field invoice-form__item-select"
          hide-details
          item-color
          dense
          flat
          filled
          append-icon="mdi-chevron-down"
          :menu-props="{ 'content-class': 'invoice-form__select-menu' }"
          :items="$options.INVOICE_TYPES"
        />
        <v-select
          v-model="currency"
          item-color
          hide-details
          dense
          flat
          filled
          append-icon="mdi-chevron-down"
          :items="currencyItems"
          :menu-props="{ 'content-class': 'invoice-form__select-menu' }"
          class="invoice-form__short-field invoice-form__item-select"
        />

        <v-btn class="invoice-form__add-button" depressed @click="addAmountField">Add item</v-btn>
      </div>

      <div v-for="(field, index) in amountFields" :key="index" class="invoice-form__item">
        <form-text-field v-model="field.description" label="Description" class="invoice-form__long-field mb-0" />

        <form-text-field
          v-if="invoiceType.id !== 1"
          v-model="field.quantity"
          :label="invoiceType.labelQuantity"
          class="invoice-form__short-field mb-0"
        />

        <form-text-field
          v-model="field.amount"
          type="number"
          min="0"
          class="invoice-form__short-field mb-0"
          :label="invoiceType.labelItemPrice"
        />

        <v-btn depressed icon class="invoice-form__remove-button" min-width="20" @click="removeField(field)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <v-divider></v-divider>

      <span class="invoice-form__amount">
        <span>Amount: </span>
        <span>
          {{ currency }}
          <span class="invoice-form__total-value">
            {{ totalConvertedAmount }}
          </span>
        </span>
      </span>
    </div>

    <invoice-preview
      v-if="step === 2"
      :address="selectedWallet.address"
      :contact="contact"
      :fields="amountFields"
      :currency="currency"
      :total-amount="totalConvertedAmount"
    />
  </modal-wrapper>
</template>

<script>
import FormTextField from '@/components/UI/Forms/TextField.vue'
import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import WalletSelector from '@/components/Wallets/WalletSelector.vue'

import { fiatCurrencies, convertAmountToOtherCurrency } from '@/services/converter'
import InvoicePreview from './Preview.vue'

const INVOICE_TYPES = [
  { id: 1, label: 'Amount only', labelItemPrice: 'Amount' },
  { id: 2, label: 'Hourly', labelQuantity: 'Hours', labelItemPrice: 'Rate' },
  { id: 3, label: 'Quantity', labelQuantity: 'Quantity', labelItemPrice: 'Item price' }
]

function generateFieldModel() {
  return { description: null, quantity: null, amount: null }
}

export default {
  name: 'InvoiceForm',
  components: { ModalWrapper, FormTextField, WalletSelector, InvoicePreview },
  INVOICE_TYPES,
  props: {
    value: { type: Boolean, default: false },
    address: { type: String, default: '' }
  },
  data() {
    return {
      selectedWallet: null,
      contact: '',
      amountFields: [generateFieldModel()],
      currency: fiatCurrencies[0],
      invoiceType: INVOICE_TYPES[0],
      step: 1
    }
  },
  computed: {
    wallets() {
      return this.$store.getters.currentSubWallets
    },
    currencyItems() {
      return this.selectedWallet ? [...fiatCurrencies, this.selectedWallet.currencyName] : [...fiatCurrencies]
    },
    sumAmount() {
      return this.amountFields.reduce((sum, el) => {
        const quantity = this.invoiceType.id !== 1 ? el.quantity : 1
        return sum + +el.amount * quantity
      }, 0)
    },
    totalConvertedAmount() {
      return this.selectedWallet
        ? convertAmountToOtherCurrency(this.sumAmount, this.selectedWallet.currencyName, this.currency)
        : 0
    }
  },
  created() {
    if (this.address && this.wallets) {
      this.selectedWallet = this.wallets.find(el => el.address === this.address)
    }
  },
  methods: {
    convertAmountToOtherCurrency,

    hide() {
      this.$emit('toggle', false)
      this.resetState()
    },
    close() {
      if (this.step === 2) {
        this.step = 1
      } else {
        this.$emit('close')
        this.resetState()
      }
    },
    submit() {
      if (this.step === 1 && this.selectedWallet) {
        this.step = 2
        return
      }
      if (this.step === 2) {
        this.$emit('close-all')
      }
    },
    resetState() {
      if (!this.address) {
        this.selectedWallet = null
      }
      this.contact = ''
      this.amountFields = [generateFieldModel()]
      ;[this.currency] = fiatCurrencies
      ;[this.invoiceType] = INVOICE_TYPES
      this.step = 1
    },
    addAmountField() {
      this.amountFields.push(generateFieldModel())
    },
    removeField(field) {
      this.amountFields.splice(this.amountFields.indexOf(field), 1)
    }
  }
}
</script>

<style lang="scss">
.invoice-form {
  $this: &;

  &__wallet-selector {
    margin-bottom: 40px !important;
  }
  &__subtitle {
    font-size: $--font-size-extra-small-subtitle;
    font-weight: $--font-weight-semi-bold;
    margin-bottom: 16px;
  }
  &__item-select {
    border-radius: $--main-border-radius;
    color: $--dark-grey !important;

    &:focus-within {
      .v-input__icon .v-icon {
        color: $--black !important;
      }
    }
    .v-input__slot {
      background-color: $--light-grey-3 !important;

      &:hover {
        background-color: $--light-grey-1 !important;
      }
      &:before,
      &:after {
        display: none;
      }
    }
  }
  &__select-menu {
    .v-list-item--active {
      color: var(--main-color) !important;
    }
  }
  &__selectors {
    margin-bottom: 20px;

    #{$this}__long-field {
      flex-basis: 60%;
    }
    #{$this}__long-field,
    #{$this}__short-field {
      margin-bottom: 0 !important;
    }

    @include phone {
      flex-wrap: wrap;
    }
  }
  &__add-button {
    background-color: $--light-grey-3 !important;
    font-weight: $--font-weight-semi-bold;
    border-radius: $--main-border-radius;
    text-transform: none;
    flex: 1 0 140px;
    height: 40px !important;
    margin-left: 8px;
    span {
      color: $--black;
    }
    @include phone {
      margin: 8px 0 0;
      flex: 0 0 100%;
    }
  }
  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 52px;
    &:not(:last-of-type) {
      margin-bottom: 12px;
    }
  }
  &__long-field {
    flex-grow: 1;
    width: 65%;
    margin-bottom: 20px !important;
  }
  &__short-field {
    flex-grow: 0;
    width: 35%;
    margin-left: 8px !important;
    margin-bottom: 20px !important;
  }
  &__remove-button {
    color: $--grey !important;
    margin-left: 8px;
    padding: 0 0 !important;
    @include tablet {
      margin-left: 8px !important;
    }
  }
  &__amount {
    display: flex;
    justify-content: space-between;
    margin: 25px 0;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
    color: $--dark-grey;
    @include phone {
      margin: 20px 0;
      font-size: $--font-size-medium;
    }
  }
  &__total-value {
    color: $--black;
  }
}
</style>
