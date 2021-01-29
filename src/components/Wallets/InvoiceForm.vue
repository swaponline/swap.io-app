<template>
  <transition-inner class="invoice-form">
    <form class="invoice-form__form" @submit.prevent="$emit('submit')">
      <v-row>
        <h3 class="invoice-form__subtitle">Invoice Form</h3>
        <div v-if="!address" class="invoice-form__field-wrapper w-100">
          <v-text-field :value="address" color="grey" disabled label="Your wallet"> </v-text-field>
        </div>
        <v-select
          v-else
          :items="wallets"
          item-text="address"
          item-value="address"
          label="Your wallet"
          class="invoice-form__selector w-100"
          outlined
        >
        </v-select>
        <div class="invoice-form__field-wrapper">
          <v-text-field v-model="contact" color="grey" required label="Bill to"></v-text-field>
        </div>
        <h3 class="invoice-form__subtitle">Invoice Items</h3>
        <v-select
          v-model="type"
          return-object
          outlined
          class="invoice-form__selector"
          item-text="label"
          item-value="id"
          color="blue"
          :items="types"
        ></v-select>
        <v-select
          v-model="currency"
          outlined
          class="invoice-form__selector flex-grow-0"
          color="blue"
          :items="currencies"
        ></v-select>
      </v-row>
      <v-row v-for="field in amountFields" :key="field.id">
        <div class="invoice-form__field-wrapper">
          <v-text-field v-model="field.description" label="Description"></v-text-field>
        </div>
        <div v-if="type.id !== 1" class="invoice-form__field-wrapper flex-grow-0">
          <v-text-field v-model="field.quantity" :label="type.labelQuantity"></v-text-field>
        </div>
        <div class="invoice-form__field-wrapper invoice-form__field-wrapper--outer-icon flex-grow-0">
          <v-text-field v-model="field.amount" type="number" min="0" step="any" :label="type.labelItemPrice">
          </v-text-field>
        </div>
        <v-btn
          depressed
          color="white"
          class="invoice-form__remove-button px-0 mx-3 align-self-center"
          min-width="20"
          @click="removeField(field)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
      <v-btn class="invoice-form__add-button" color="blue" block text @click="addAmountField">
        <span class="text-left flex-grow-1">+ Add Another Item</span>
      </v-btn>
      <v-divider></v-divider>
      <span class="invoice-form__amount">
        <span>Amount: </span>
        <span>{{ summ }}</span>
      </span>
      <v-row class="mt-auto">
        <v-btn class="invoice-form__button" depressed type="button" @click="close">Cancel</v-btn>
        <v-btn class="invoice-form__button" depressed type="submit">Confirm</v-btn>
      </v-row>
    </form>
  </transition-inner>
</template>

<script>
export default {
  name: 'InvoiceForm',
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
    },
    address() {
      return this.$route.params.walletAddress
    }
  },
  created() {
    this.selectAddress = this.address
  },
  methods: {
    close() {
      this.$emit('close')
    },
    preview() {
      this.$emit('preview', {
        contact: this.contact,
        type: this.type,
        amountFields: this.amountFields,
        currency: this.currency,
        address: this.address,
        summ: this.summ
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
  max-height: 100%;
  @include small-height {
    max-height: none;
  }
  &__form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 25px 60px 40px;
    height: 100%;

    @include tablet {
      padding: 0 10px 20px;
    }
    .row {
      flex-grow: 0;
    }
    .w-100 {
      width: 100% !important;
      flex-basis: 100% !important;
    }
  }
  &__subtitle {
    margin: 20px 8px 25px;
    width: 100%;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-small-subtitle;
  }
  &__field-wrapper {
    border: 1px solid $--black;
    border-radius: 8px;
    display: flex;
    align-items: center;
    min-height: 52px;
    padding: 0 15px;
    transition: 0.3s;
    width: 21%;
    flex-grow: 1;
    margin: 0 8px 25px;
    &:focus-within {
      border-color: $--blue;
    }

    @include tablet {
      width: 100%;
      &--outer-icon {
        width: 80%;
      }
    }
    // переопределим стили vuetify
    .v-input {
      padding: 0 0;
      transition: 0.2s;
      &:focus-within {
        margin-top: 15px;
      }
      &--is-label-active {
        margin-top: 15px;
      }
      &__slot {
        margin-bottom: 0 !important;
        &::before {
          display: none;
        }
        &::after {
          display: none;
        }
        input {
          outline: none !important;
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }
        }
        label {
          color: $--grey;
        }
      }
    }

    .v-text-field__details {
      display: none;
    }
  }
  &__selector {
    border-radius: 8px;
    border: 1px solid $--black;
    color: $--blue !important;
    margin: 0 8px 25px !important;
    flex-basis: 20% !important;
    max-height: 52px;
    &:focus-within {
      border-color: $--blue;
    }

    @include tablet {
      width: 100%;
      flex-basis: 100% !important;
    }
    // переопределим стили vuetify
    .v-select__selections {
      padding: 0 0 !important;
      input {
        padding: 0 0 !important;
      }
    }
    fieldset {
      display: none;
    }
    .v-text-field__details {
      display: none;
    }
    .v-input__slot {
      min-height: 52px !important;
      margin: 0 0;
    }
    .v-input__append-inner {
      margin-top: 15px !important;
    }
    .v-label {
      margin-top: -2px;
    }
    .v-label--active {
      display: none;
    }
  }
  &__remove-button {
    margin-bottom: 25px;
    &::before {
      display: none;
    }
  }
  &__add-button {
    font-weight: $--font-weight-bold;
    text-transform: none;
    flex-grow: 0;
    margin-bottom: 25px;
    span {
      font-size: $--font-size-medium;
    }
  }
  &__amount {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 25px 0;
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
}
</style>
