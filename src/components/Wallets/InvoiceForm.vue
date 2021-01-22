<template>
  <transition-inner class="invoice-form">
    <header class="invoice-form__header">
      <v-btn large icon class="mr-3" @click="close">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h3>Invoice Form</h3>
    </header>
    <form class="invoice-form__form" @submit.prevent="$emit('submit')">
      <v-row>
        <v-col cols="12">
          <v-text-field v-if="address" :value="address" disabled outlined label="Your wallet">
            <template #append>
              <v-icon>mdi-bitcoin</v-icon>
            </template>
          </v-text-field>
          <v-select
            v-else
            v-model="selectAddress"
            :items="wallets"
            item-text="address"
            item-value="address"
            label="Your wallet"
            outlined
          >
          </v-select>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="contact" required outlined label="Bill to"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="contact" required outlined label="Bill to"></v-text-field>
        </v-col>
      </v-row>
      <div class="invoice-form__items">
        <h3>Invoice Items</h3>
        <v-row>
          <v-col class="invoice-form__field" cols="7">
            <v-select
              v-model="type"
              return-object
              item-text="label"
              item-value="id"
              outlined
              class="invoice-form__type"
              :items="types"
            ></v-select>
          </v-col>
          <v-col class="invoice-form__field" cols="5">
            <v-select v-model="currency" outlined class="invoice-form__currency" :items="currencies"></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row v-for="field in amountFields" :key="field.id">
        <v-col class="invoice-form__field-description" cols="7">
          <v-text-field v-model="field.description" outlined label="Description"></v-text-field>
        </v-col>
        <v-col v-if="type.id !== 1" cols="2" class="invoice-form__field-quantity">
          <v-text-field v-model="field.quantity" outlined :label="type.labelQuantity"></v-text-field>
        </v-col>
        <v-col :cols="type.id === 1 ? 5 : 3" class="invoice-form__field-amount">
          <v-text-field v-model="field.amount" type="number" min="0" step="any" outlined :label="type.labelItemPrice">
            <template #append-outer>
              <v-icon @click="removeField(field)">mdi-close</v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn color="blue" block text @click="addAmountField">
            <span class="text-left flex-grow-1">+ Add Another Item</span>
          </v-btn>
        </v-col>
        <v-col cols="12" class="d-flex">
          <h3 class="text-right flex-grow-1">Amount: {{ summ }}</h3>
        </v-col>
      </v-row>
      <div class="d-flex justify-end">
        <v-btn class="mr-2" type="button" @click="close">Cancel</v-btn>
        <v-btn class="mr-2" type="button" @click="preview">Preview</v-btn>
        <v-btn type="submit">Confirm</v-btn>
      </div>
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
      return this.$route.query.wallet
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
  max-height: calc(100% - 110px);
  &__header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background: $--white;
    @include tablet {
      padding: 10px 5px;
    }
  }
  &__form {
    padding: 0 15px 10px;
    @include tablet {
      padding: 0 5px 10px;
    }
  }
  &__field {
    @include tablet {
      flex-basis: 100%;
      max-width: 100%;
    }
  }
  &__field-description {
    @include tablet {
      position: relative;
      display: flex;
      justify-content: center;
      padding-right: 12px;
      flex-basis: 100%;
      max-width: 100%;
      &:before {
        content: '';
        width: 25%;
        position: absolute;
        top: 0;
        height: 1px;
        background: rgba($color: $--black, $alpha: 0.2);
      }
    }
  }
  &__field-quantity {
    @include tablet {
      padding-left: 12px;
      flex-basis: 50%;
      max-width: 50%;
    }
  }
  &__field-amount {
    @include tablet {
      padding-left: 12px;
      flex-basis: 50%;
      flex-grow: 1;
      max-width: 100%;
    }
  }
}
</style>
