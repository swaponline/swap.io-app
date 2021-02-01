<template>
  <form-wrapper value persistent class="invoice-preview" @input="close">
    <div class="invoice-preview__inner">
      <header class="invoice-preview__title">
        <v-btn color="black" icon @click="close">
          <v-icon size="30">mdi-chevron-left</v-icon>
        </v-btn>
        <h3>Invoice { number invoice }</h3>
      </header>
      <h3 class="invoice-preview__subtitle">From:</h3>
      <p class="invoice-preview__agent-info">
        <span>User: {{ currentAccount.name }}</span>
        <span>Wallet: {{ currentWallet.name }}</span>
        <span>Wallet address: {{ address }}</span>
      </p>
      <h3 class="invoice-preview__subtitle">Bill:</h3>
      <p class="invoice-preview__agent-info">
        <span>Invoice was sent to profile: {{ contact }}</span>
      </p>
      <h3 class="invoice-preview__subtitle">Invoice items:</h3>

      <v-simple-table class="invoice-preview__table">
        <thead>
          <tr>
            <th class="invoice-preview__table-head invoice-preview__table-head--description text-left px-0">
              Description
            </th>
            <th
              v-if="type.labelQuantity"
              class="invoice-preview__table-head invoice-preview__table-head--quantity text-right px-0"
            >
              {{ type.labelQuantity }}
            </th>
            <th class="invoice-preview__table-head invoice-preview__table-head--amount text-right px-0">
              {{ type.labelItemPrice }}
            </th>
            <th
              v-if="type.labelQuantity"
              class="invoice-preview__table-head invoice-preview__table-head--amount text-right px-0"
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in amountFields" :key="item.id">
            <td class="invoice-preview__table-cell text-left">{{ item.description }}</td>
            <td v-if="type.labelQuantity" class="invoice-preview__table-cell text-right">{{ item.quantity }}</td>
            <td class="invoice-preview__table-cell text-right">
              <span class="invoice-preview__currency-name">USD</span>
              {{ item.amount }}
            </td>
            <td v-if="type.labelQuantity" class="invoice-preview__table-cell text-right">
              <span class="invoice-preview__currency-name">USD</span> {{ item.amount * item.quantity }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>

      <v-divider class="mb-6"></v-divider>

      <span v-if="type.labelQuantity" class="invoice-preview__quantity">
        <span>Total {{ type.labelQuantity }}:</span>
        <span>{{ summQuantity }}</span>
      </span>

      <span class="invoice-preview__amount">
        <span>Total amount: </span>
        <span>
          <span class="invoice-preview__currency-name">USD</span>
          {{ summ }}
        </span>
      </span>

      <v-row class="mt-auto">
        <v-btn class="invoice-form__button" depressed type="button" @click="close">Cancel</v-btn>
        <v-btn class="invoice-form__button" depressed type="submit">Confirm</v-btn>
      </v-row>
    </div>
  </form-wrapper>
</template>

<script>
import FormWrapper from '../FormWrapper.vue'

export default {
  name: 'InvoicePreview',
  components: {
    FormWrapper
  },
  props: {
    type: {
      type: Object,
      required: true
    },
    amountFields: {
      type: Array,
      default() {
        return []
      }
    },
    contact: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    summ: {
      type: Number,
      required: true
    }
  },
  computed: {
    summQuantity() {
      return this.amountFields.reduce((acc, el) => {
        return acc + +el.quantity
      }, 0)
    },
    date() {
      return new Date().toLocaleDateString()
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
    currentAccount() {
      return this.$store.getters.currentAccount
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.invoice-preview {
  &__inner {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 25px 40px 40px;
    margin: 0 0;
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
  &__title {
    display: flex;
    align-items: center;
    margin: 20px -10px 25px;
    width: auto;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-small-subtitle;
  }
  &__subtitle {
    margin-bottom: 10px;
    font-size: $--font-size-extra-small-subtitle;
  }
  &__agent-info {
    font-size: $--font-size-medium;
    margin-bottom: 40px !important;
    span {
      display: block;
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }
  &__table {
    margin-bottom: 20px;
  }
  &__table-head {
    color: $--dark-grey !important;
    font-size: $--font-size-medium !important;
    border-width: 0px !important;
    padding-bottom: 10px;
  }
  &__table-cell {
    border-width: 0px !important;
    font-size: $--font-size-medium !important;
    padding: 5px 0 !important;
  }
  &__quantity {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 0 10px;
    flex-grow: 0;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-small-subtitle;
  }
  &__amount {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 0 25px;
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
