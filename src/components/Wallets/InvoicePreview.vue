<template>
  <div class="invoice-preview">
    <header class="invoice-preview__header">
      <v-btn icon @click="$emit('close')">
        <v-icon size="30">mdi-arrow-left</v-icon>
      </v-btn>
      <h3>Back</h3>
    </header>
    <v-row>
      <v-col cols="12">
        <h2 class="invoice-preview__title">
          <div>Invoice {number invoice}</div>
          <div>Date: {{ date }}</div>
        </h2>
      </v-col>
      <v-col lg="6" cols="12">
        <v-col cols="12">
          <h3>From:</h3>
        </v-col>
        <v-col cols="12">
          <div>User: {{ currentAccount.name }}</div>
          <div>Wallet: {{ currentWallet.name }}</div>
          <div>Wallet address: {{ address }}</div>
        </v-col>
      </v-col>
      <v-col lg="6" cols="12">
        <v-col cols="12">
          <h3>Bill to:</h3>
        </v-col>
        <v-col cols="12">
          <div>Invoice was sent to profile: {{ contact }}</div>
        </v-col>
      </v-col>
    </v-row>
    <v-row class="invoice-preview__horizontal-line"></v-row>
    <v-simple-table class="mt-4">
      <thead>
        <tr>
          <th class="invoice-preview__table-head invoice-preview__table-head--description text-left">
            Description
          </th>
          <th
            v-if="type.labelQuantity"
            class="invoice-preview__table-head invoice-preview__table-head--quantity text-left"
          >
            {{ type.labelQuantity }}
          </th>
          <th class="invoice-preview__table-head invoice-preview__table-head--amount text-left">
            {{ type.labelItemPrice }}
          </th>
          <th
            v-if="type.labelQuantity"
            class="invoice-preview__table-head invoice-preview__table-head--amount text-left"
          >
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in amountFields" :key="item.id">
          <td>{{ item.description }}</td>
          <td v-if="type.labelQuantity">{{ item.quantity }}</td>
          <td>{{ item.amount }}</td>
          <td v-if="type.labelQuantity">{{ item.amount * item.quantity }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-row class="justify-end">
      <v-col lg="3" md="5" xs="12" cols="7" class="d-flex">
        <h3 class="text-right flex-grow-1">
          <div class="invoice-preview__total">
            <h4 v-if="type.labelQuantity" class="text-right flex-grow-1 d-flex justify-space-between">
              Total {{ type.labelQuantity }}: <span>{{ summQuantity }}</span>
            </h4>
          </div>
          <div class="invoice-preview__total mt-1 d-flex justify-space-between">
            Total Amount: <span class="invoice-preview__currency">{{ summ }} {{ currency }}</span>
          </div>
        </h3>
      </v-col>
    </v-row>
    <v-row class="invoice-preview__buttons justify-end">
      <v-btn class="invoice-preview__button" @click="$emit('close')">Cancel</v-btn>
      <v-btn class="invoice-preview__button" @click="$emit('submit')">Confirm</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'InvoicePreview',
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
  }
}
</script>

<style lang="scss">
.invoice-preview {
  position: absolute;
  z-index: $--z-index-high;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  max-width: calc(var(--max-content-size) - var(--navigation-drawer-desktop-width));
  overflow-x: hidden;
  overflow-y: auto;
  background: $--white;
  padding: 10px 15px;
  @include tablet {
    padding: 10px 10px;
    width: 100%;
    height: calc(var(--vh, 1vh) * 100 - 40px);
  }
  &__header {
    display: flex;
    align-items: center;
    h3 {
      margin-left: 12px;
    }
  }
  &__title {
    @include tablet {
      font-size: $--font-size-extra-small-subtitle;
    }
  }
  &__button {
    margin-right: 12px;
  }
  &__horizontal-line {
    height: 1px;
    background: rgba($--black, 0.2);
  }
  &__table-head {
    border-top: thin solid rgba($--black, 0.12);
    &--description {
      width: 70%;
    }
    &--quantity {
      width: 15%;
    }
    &--amount {
      width: 15%;
    }
  }
  &__currency {
    opacity: 0.7;
  }
}
</style>
