<template>
  <modal-wrapper :value="value" title="Invoice form" @input="hide" @submit="submit" @cancel="close">
    <div class="invoice-form">
      <form-indent v-if="selectAddress" title="Wallet balance:" :text="selectAddress" class="mb-8" />

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

      <div class="d-flex">
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
      </div>

      <div v-for="field in amountFields" :key="field.id" class="d-flex">
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
      </div>

      <v-btn class="invoice-form__add-button px-0" color="blue" text @click="addAmountField">
        <span class="text-left flex-grow-1">+ Add Another Item</span>
      </v-btn>

      <v-divider></v-divider>

      <span class="invoice-form__amount">
        <span>Amount: </span>
        <span>
          <span class="invoice-form__currency-name">USD</span>
          {{ summ }}
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

export default {
  name: 'InvoiceForm',
  components: {
    ModalWrapper,
    FormTextField,
    FormSelector,
    FormIndent
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
    hide() {
      this.$emit('toggle', false)
    },
    close() {
      this.$emit('close')
    },
    submit() {
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
    margin-bottom: 25px;
    margin-left: 16px;
    padding: 0 0 !important;
    @include tablet {
      margin-left: 8px !important;
    }
    &::before {
      display: none;
    }
  }
  &__add-button {
    height: auto !important;
    font-weight: $--font-weight-bold;
    text-transform: none;
    flex-grow: 0;
    margin: 25px 0;
    width: 100%;
    @include phone {
      margin-top: 20px;
    }
    span {
      letter-spacing: 0.01em;
      color: $--purple;
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
