<template>
  <form-wrapper value persistent class="invoice-form" @input="close">
    <form class="invoice-form__form" @submit.prevent="$emit('submit')">
      <v-row>
        <h3 class="invoice-form__subtitle">
          <span>Invoice Form</span>
          <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
        </h3>

        <form-text-field v-if="address" :value="address" disabled label="Your wallet" color="grey">
          <template #append>
            <v-icon>mdi-bitcoin</v-icon>
          </template>
        </form-text-field>

        <form-selector
          v-else
          :items="wallets"
          item-text="address"
          item-value="address"
          label="Your wallet"
          outlined
        ></form-selector>

        <form-text-field v-model="contact" color="grey" required label="Bill to"></form-text-field>

        <h3 class="invoice-form__subtitle">Invoice Items</h3>

        <form-selector
          v-model="type"
          return-object
          outlined
          item-text="label"
          item-value="id"
          color="blue"
          :items="types"
        ></form-selector>

        <form-selector v-model="currency" outlined color="blue" :items="currencies"></form-selector>
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
  </form-wrapper>
</template>

<script>
import FormWrapper from '../FormWrapper.vue'
import FormTextField from '../FormTextField.vue'
import FormSelector from '../FormSelector.vue'

export default {
  name: 'InvoiceForm',
  components: {
    FormWrapper,
    FormTextField,
    FormSelector
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
  &__form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 25px 50px 40px;
    height: 100%;

    @include tablet {
      padding: 0 10px 20px;
    }
    .row {
      flex-grow: 0;
    }
  }
  &__row {
    flex-wrap: nowrap;
    @include phone {
      flex-wrap: wrap;
    }
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
