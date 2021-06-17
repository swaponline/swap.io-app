<template>
  <modal-wrapper :value="value" title="Invoice form" @input="hide" @submit="submit" @cancel="close">
    <div class="invoice-form">
      <form-indent v-if="selectedWallet" title="Wallet balance:" :text="selectedWallet.address" class="mb-8" />

      <wallet-selector v-if="!address" v-model="selectedWallet" :items="wallets" />

      <form-text-field v-model="contact" color="grey" required label="Bill to"></form-text-field>

      <h3 class="invoice-form__subtitle">Invoice Items</h3>

      <div class="d-flex">
        <form-selector
          v-model="invoiceType"
          return-object
          outlined
          item-text="label"
          item-value="id"
          class="invoice-form__long-field"
          :items="$options.INVOICE_TYPES"
        ></form-selector>

        <form-selector
          v-model="currency"
          outlined
          :items="$options.CURRENCIES"
          class="invoice-form__short-field"
        ></form-selector>
      </div>

      <div v-for="(field, index) in amountFields" :key="index" class="d-flex align-center">
        <form-text-field
          v-model="field.description"
          label="Description"
          class="invoice-form__long-field"
        ></form-text-field>

        <form-text-field
          v-if="invoiceType.id !== 1"
          v-model="field.quantity"
          :label="invoiceType.labelQuantity"
          class="invoice-form__short-field"
        ></form-text-field>

        <form-text-field
          v-model="field.amount"
          type="number"
          min="0"
          class="invoice-form__short-field"
          :label="invoiceType.labelItemPrice"
        ></form-text-field>

        <v-btn depressed icon class="invoice-form__remove-button" min-width="20" @click="removeField(field)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <v-btn class="invoice-form__add-button px-0" color="var(--main-color)" text @click="addAmountField">
        <span class="text-left flex-grow-1">+ Add Another Item</span>
      </v-btn>

      <v-divider></v-divider>

      <span class="invoice-form__amount">
        <span>Amount: </span>
        <span>
          <span class="invoice-form__currency-name">{{ currency }}</span>
          {{ totalConvertedAmount }}
        </span>
      </span>
    </div>
  </modal-wrapper>
</template>

<script>
import { INVOICE_PREVIEW } from '@/store/modules/Modals/names'
import { ADD_MODAL } from '@/store/modules/Modals'

import { mapMutations } from 'vuex'
import FormTextField from '@/components/UI/Forms/TextField.vue'
import FormSelector from '@/components/UI/Forms/Selector.vue'
import FormIndent from '@/components/UI/Forms/Indent.vue'
import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import WalletSelector from '@/components/Wallets/WalletSelector.vue'

import { currencies, convertAmountToOtherCurrency } from '@/services/converter'

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
  components: { ModalWrapper, FormTextField, FormSelector, FormIndent, WalletSelector },
  INVOICE_TYPES,
  CURRENCIES: currencies,
  props: {
    value: { type: Boolean, default: false },
    address: { type: String, default: '' }
  },
  data() {
    return {
      selectedWallet: null,
      contact: 'as123asdfascd',
      amountFields: [generateFieldModel()],
      currency: currencies[0],
      invoiceType: INVOICE_TYPES[0]
    }
  },
  computed: {
    wallets() {
      return this.$store.getters.currentSubWallets
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
    ...mapMutations({
      mutationAddModal: ADD_MODAL
    }),
    hide() {
      this.$emit('toggle', false)
    },
    close() {
      this.$emit('close')
    },
    submit() {
      if (this.selectedWallet) {
        this.mutationAddModal({
          name: INVOICE_PREVIEW,
          info: {
            contact: this.contact,
            type: this.invoiceType,
            amountFields: this.amountFields,
            currency: this.currency,
            address: this.selectedWallet.address,
            sum: this.sumAmount
          }
        })
      }
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
  &__subtitle {
    margin: 40px 0 30px;
    @include tablet {
      margin: 35px 0 20px;
    }
    @include phone {
      margin: 25px 0 15px;
    }
  }
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
  &__remove-button {
    margin-bottom: 16px;
    margin-left: 16px;
    padding: 0 0 !important;
    @include tablet {
      margin-left: 8px !important;
    }
  }
  &__add-button {
    font-weight: $--font-weight-bold;
    text-transform: none;
    flex-grow: 0;
    margin: 10px 0;
    width: 100%;
    @include phone {
      margin-top: 20px;
    }
    span {
      letter-spacing: 0.01em;
      color: var(--main-color);
      font-size: $--font-size-medium;
    }
  }
  &__amount {
    display: flex;
    justify-content: space-between;
    margin: 25px 0;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
    @include phone {
      margin: 20px 0;
      font-size: $--font-size-medium;
    }
  }
  &__currency-name {
    color: $--dark-grey;
  }
}
</style>
