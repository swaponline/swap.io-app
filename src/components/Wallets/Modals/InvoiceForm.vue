<template>
  <modal-wrapper :value="value" persistent class="invoice-form" @input="close">
    <form class="invoice-form__form" @submit.prevent="preview">
      <v-row>
        <h3 class="invoice-form__subtitle">
          <span>Invoice Form</span>
          <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
        </h3>

        <p v-if="selectAddress" class="invoice-form__indent mb-8">
          <span class="invoice-form__indent-title">Wallet balance:</span>
          <span>{{ selectAddress }}</span>
        </p>

        <form-selector
          v-if="!address"
          v-model="selectAddress"
          :items="wallets"
          item-text="address"
          item-value="address"
          label="Your wallet"
          outlined
        ></form-selector>

        <form-text-field v-model="contact" color="grey" required label="Bill to"></form-text-field>

        <h3 class="invoice-form__subtitle">Invoice Items</h3>
      </v-row>

      <v-row class="invoice-form__row">
        <form-selector
          v-model="type"
          return-object
          outlined
          item-text="label"
          item-value="id"
          color="blue"
          class="invoice-form__long-field"
          :items="types"
        ></form-selector>

        <form-selector
          v-model="currency"
          outlined
          color="blue"
          :items="currencies"
          class="invoice-form__short-field"
        ></form-selector>
      </v-row>

      <v-row v-for="field in amountFields" :key="field.id" class="invoice-form__row">
        <form-text-field
          v-model="field.description"
          label="Description"
          class="invoice-form__long-field"
        ></form-text-field>

        <form-text-field
          v-if="type.id !== 1"
          v-model="field.quantity"
          :label="type.labelQuantity"
          class="invoice-form__short-field"
        ></form-text-field>

        <form-text-field
          v-model="field.amount"
          type="number"
          min="0"
          step="any"
          class="invoice-form__short-field"
          :label="type.labelItemPrice"
        ></form-text-field>

        <v-btn
          depressed
          color="white"
          class="invoice-form__remove-button align-self-center"
          min-width="20"
          @click="removeField(field)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>

      <v-row>
        <v-btn class="invoice-form__add-button px-0" color="blue" text @click="addAmountField">
          <span class="text-left flex-grow-1">+ Add Another Item</span>
        </v-btn>

        <v-divider class="mx-2"></v-divider>
      </v-row>

      <span class="invoice-form__amount">
        <span>Amount: </span>
        <span>
          <span class="invoice-form__currency-name">USD</span>
          {{ summ }}
        </span>
      </span>

      <v-row class="mt-auto">
        <v-btn class="invoice-form__button" depressed type="button" @click="close">Cancel</v-btn>
        <v-btn class="invoice-form__button" depressed type="submit">Confirm</v-btn>
      </v-row>
    </form>
  </modal-wrapper>
</template>

<script>
import { INVOICE_PREVIEW } from '@/store/modules/Modals/names'
import { ADD_MODAL } from '@/store/modules/Modals'

import { mapMutations } from 'vuex'
import ModalWrapper from '../../ModalWrapper.vue'
import FormTextField from '../../FormTextField.vue'
import FormSelector from '../../FormSelector.vue'

export default {
  name: 'InvoiceForm',
  components: {
    ModalWrapper,
    FormTextField,
    FormSelector
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    address: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      contact: 'as123asdfascd',
      amountFields: [{ id: 1, description: null, quantity: null, amount: null }],
      currency: 'USD',
      type: { id: 1, label: 'Amount only', labelItemPrice: 'Amount' },
      types: [
        { id: 1, label: 'Amount only', labelItemPrice: 'Amount' },
        { id: 2, label: 'Hourly', labelQuantity: 'Hours', labelItemPrice: 'Rate' },
        { id: 3, label: 'Quantity', labelQuantity: 'Quantity', labelItemPrice: 'Item price' }
      ],
      currencies: ['USD', 'BTC', 'ETH'],
      selectAddress: null
    }
  },
  computed: {
    wallets() {
      return this.$store.getters.siblingList
    },
    summ() {
      return this.amountFields.reduce((summ, el) => {
        const quantity = this.type.id !== 1 ? el.quantity : 1
        return summ + +el.amount * quantity
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
    close() {
      this.$emit('close')
    },
    preview() {
      this.mutationAddModal({
        name: INVOICE_PREVIEW,
        info: {
          contact: this.contact,
          type: this.type,
          amountFields: this.amountFields,
          currency: this.currency,
          address: this.address,
          summ: this.summ
        }
      })
    },
    addAmountField() {
      const lastField = this.amountFields[this.amountFields.length - 1]
      const id = lastField ? lastField.id + 1 : 1
      this.amountFields.push({ id, description: null, quantity: null, amount: null })
    },
    removeField(field) {
      if (field) {
        this.amountFields.splice(this.amountFields.indexOf(field), 1)
      }
    }
  }
}
</script>

<style lang="scss">
.invoice-form {
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
    flex-wrap: nowrap;
  }
  &__long-field {
    flex-grow: 1;
    width: 65%;
    @include phone {
      margin: 0 5px 25px;
      width: calc(56% - 10px);
    }
  }
  &__short-field {
    flex-grow: 0;
    width: 35%;
    @include phone {
      margin: 0 5px 25px;
      width: calc(35% - 10px);
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
  &__remove-button {
    margin-bottom: 25px;
    padding: 0 0 !important;
    @include phone {
      margin-right: 8px;
    }
    &::before {
      display: none;
    }
  }
  &__add-button {
    font-weight: $--font-weight-bold;
    text-transform: none;
    flex-grow: 0;
    margin: 0 8px 25px;
    width: calc(100% - 16px);
    span {
      font-size: $--font-size-medium;
    }
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
  &__amount {
    display: flex;
    justify-content: space-between;
    margin: 25px -4px;
    flex-grow: 1;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-small-subtitle;
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
