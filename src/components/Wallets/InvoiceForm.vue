<template>
  <transition-translate>
    <form v-if="visible && !share" class="invoice-form" @submit.prevent="share = true">
      <header class="d-flex mb-2 align-center">
        <v-btn large icon class="mr-3" @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h3>Invoice Form</h3>
      </header>
      <v-text-field :value="address" disabled outlined label="Your wallet">
        <template #append>
          <v-icon>mdi-bitcoin</v-icon>
        </template>
      </v-text-field>
      <v-text-field outlined label="Bill to"></v-text-field>
      <div class="invoice-form__items">
        <h3>Invoice Items</h3>
        <v-row>
          <v-col class="invoice-form__field" cols="8">
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
          <v-col class="invoice-form__field" cols="4">
            <v-select v-model="currency" outlined class="invoice-form__currency" :items="currencies"></v-select>
          </v-col>
        </v-row>
      </div>
      <div>
        <v-row v-for="field in amountFields" :key="field.id">
          <v-col class="invoice-form__field-description" :cols="type.id === 1 ? 9 : 7">
            <v-text-field v-model="field.description" outlined label="Description"></v-text-field>
          </v-col>
          <v-col v-if="type.id !== 1" cols="2" class="invoice-form__field-quantity">
            <v-text-field v-model="field.quantity" outlined :label="type.label"></v-text-field>
          </v-col>
          <v-col cols="3" class="invoice-form__field-amount">
            <v-text-field v-model="field.amount" type="number" min="0" outlined label="Amount">
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
        </v-row>
      </div>
      <v-row>
        <v-col cols="12" class="d-flex">
          <h3 class="text-right flex-grow-1">Amount: {{ summ }}</h3>
        </v-col>
      </v-row>
      <div class="d-flex justify-end">
        <v-btn class="mr-2" type="button" @click="back">Cancel</v-btn>
        <v-btn type="submit">Confirm</v-btn>
      </div>
    </form>
    <invoice-share v-else-if="visible && share" @close="back"></invoice-share>
  </transition-translate>
</template>

<script>
import TransitionTranslate from '@/components/Transitions/Translate.vue'
import InvoiceShare from './InvoiceShare.vue'

export default {
  name: 'InvoiceForm',
  components: {
    TransitionTranslate,
    InvoiceShare
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      amountFields: [{ id: 1, description: null, quantity: null, amount: null }],
      share: false,
      currency: 'USD',
      type: { id: 1, label: 'Amount only' },
      types: [
        { id: 1, label: 'Amount only' },
        { id: 2, label: 'Hourly' },
        { id: 3, label: 'Quantity' }
      ],
      currencies: ['USD', 'BTC', 'ETH']
    }
  },
  computed: {
    address() {
      return this.$route.query.wallet
    },
    summ() {
      return this.amountFields.reduce((summ, el) => {
        return summ + +el.amount
      }, 0)
    }
  },
  methods: {
    confirm() {
      this.$router.push({ name: 'Invoice', params: { invoiceId: '123asdfdjai' } })
    },
    back() {
      this.share = false
      this.$emit('back')
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
  position: absolute;
  z-index: $--z-index-high;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  max-width: calc(var(--max-content-size) - var(--navigation-drawer-desktop-width));
  overflow-x: hidden;
  overflow-y: auto;
  background: $--white;
  padding: 10px 15px;
  @include tablet {
    padding: 10px 5px;
    width: 100vw;
  }
  &__field {
    @include tablet {
      flex-basis: 100%;
      max-width: 100%;
    }
  }
  &__field-description {
    padding-right: 0;
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
    padding-left: 0;
    padding-right: 0;
    @include tablet {
      padding-left: 12px;
      flex-basis: 50%;
      max-width: 50%;
    }
  }
  &__field-amount {
    padding-left: 0;
    @include tablet {
      padding-left: 12px;
      flex-basis: 50%;
      flex-grow: 1;
      max-width: 100%;
    }
  }
  .v-text-field__details {
    display: none;
  }
  .v-select__slot {
    min-height: 48px;
  }
  .v-input__append-inner {
    margin-top: 0;
    align-self: center;
  }
}
</style>
