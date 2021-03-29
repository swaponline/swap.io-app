<template>
  <modal-wrapper
    value
    persistent
    back-icon
    hide-overlay
    modificator="flat"
    :transition="false"
    title="Invoice confirm"
    cancel-button-label="Back"
    @input="close"
    @cancel="close"
    @submit="confirm"
  >
    <div class="invoice-preview">
      <h3 class="invoice-preview__subtitle">From:</h3>
      <p class="invoice-preview__agent-info">
        <span>User: {{ currentAccount.name }}</span>
        <span>Wallet: {{ currentWallet.name }}</span>
        <span class="invoice-preview__wallet">
          Wallet address: {{ formatAddress }}
          <div class="invoice-preview__wallet-buttons">
            <v-tooltip v-model="copyTooltip.value" top :open-on-hover="false">
              <template #activator="{ on }">
                <button @click="copy">
                  <svg-icon class="invoice-preview__icon-copy" name="copy" v-on="on"></svg-icon>
                </button>
              </template>
              <span>Copied</span>
            </v-tooltip>

            <button>
              <svg-icon class="invoice-preview__icon-qrcode" name="qrcode"></svg-icon>
            </button>
          </div>

          <v-btn class="invoice-preview__show-button" depressed @click="showFullWallet">Show in full</v-btn>
        </span>
      </p>

      <h3 class="invoice-preview__subtitle">Bill:</h3>
      <p class="invoice-preview__agent-info">
        <span>Invoice was sent to profile: {{ contact }}</span>
      </p>

      <h3 class="invoice-preview__subtitle">Invoice items:</h3>
      <v-simple-table class="invoice-preview__table">
        <thead>
          <tr>
            <th class="invoice-preview__table-head text-left">
              Description
            </th>
            <th v-if="type.labelQuantity" class="invoice-preview__table-head text-right">
              {{ mediaQueries.phone && type.labelQuantity === 'Quantity' ? 'Qty' : type.labelQuantity }}
            </th>
            <th class="invoice-preview__table-head text-right">
              {{ type.labelItemPrice }}
            </th>
            <th v-if="type.labelQuantity" class="invoice-preview__table-head text-right">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in fields" :key="item.id">
            <td class="invoice-preview__table-cell text-left">{{ item.description }}</td>
            <td v-if="type.labelQuantity" class="invoice-preview__table-cell text-right">{{ item.quantity }}</td>
            <td class="invoice-preview__table-cell text-right">
              <span v-if="!mediaQueries.phone" class="invoice-preview__currency-name">USD</span>
              {{ item.amount }}
            </td>
            <td v-if="type.labelQuantity" class="invoice-preview__table-cell text-right">
              <span v-if="!mediaQueries.phone" class="invoice-preview__currency-name">USD</span>
              {{ item.amount * item.quantity }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>

      <v-divider class="mb-6"></v-divider>

      <span v-if="type.labelQuantity" class="invoice-preview__quantity">
        <span>Total {{ type.labelQuantity.toLowerCase() }}:</span>
        <span>{{ summQuantity }}</span>
      </span>

      <span class="invoice-preview__amount">
        <span>Total amount: </span>
        <span>
          <span class="invoice-preview__currency-name">USD</span>
          {{ summ }}
        </span>
      </span>
    </div>
  </modal-wrapper>
</template>

<script>
import copy from '@/utils/copy'
import { mapMutations } from 'vuex'
import { ADD_MODAL } from '@/store/modules/Modals'
import { INVOICE_FORM, COPY_MENU } from '@/store/modules/Modals/names'

import ModalWrapper from '@/components/UI/ModalWrapper.vue'

export default {
  name: 'InvoicePreview',
  inject: ['mediaQueries'],
  components: {
    ModalWrapper
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
  data() {
    return {
      copyTooltip: {
        value: false,
        timer: 0
      }
    }
  },
  computed: {
    fields() {
      return this.amountFields.filter(el => !!el.description && (el.amount !== null || el.amount !== undefined))
    },
    formatAddress() {
      if (this.mediaQueries.desktop) {
        return this.address
      }
      return `**${this.address.slice(-5)}`
    },
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
  beforeDestroy() {
    clearTimeout(this.copyTooltip.timer)
  },
  methods: {
    ...mapMutations({
      mutationAddModal: ADD_MODAL
    }),
    close() {
      this.mutationAddModal({ id: `${INVOICE_FORM + this.address}` })
      this.$emit('close')
    },
    confirm() {
      this.$emit('close-all')
    },
    showFullWallet() {
      this.mutationAddModal({
        name: COPY_MENU,
        info: {
          address: this.address,
          showAddress: true
        }
      })
    },
    copy() {
      copy(this.address)
        .then(() => {
          this.copyTooltip.value = true
          if (this.copyTooltip.timer) {
            clearTimeout(this.copyTooltip.timer)
          }
          this.copyTooltip.timer = setTimeout(() => {
            this.copyTooltip.value = false
          }, 1500)
        })
        .catch(err => {
          console.log('Значение не скопировано', err)
        })
    }
  }
}
</script>

<style lang="scss">
.invoice-preview {
  &__subtitle {
    margin-bottom: 10px;
    font-size: $--font-size-extra-small-subtitle;
  }
  &__agent-info {
    font-size: $--font-size-medium;
    margin-bottom: 40px !important;
    span {
      display: flex;
    }
  }
  &__wallet {
    display: flex;
    align-items: flex-end;

    @include tablet {
      justify-content: space-between;
      align-items: center;
    }
  }
  &__table {
    margin-bottom: 20px;
  }
  &__table-head {
    color: $--dark-grey !important;
    font-size: $--font-size-medium !important;
    border-width: 0px !important;
    padding: 0 3px 10px !important;
  }
  &__table-cell {
    border-width: 0px !important;
    font-size: $--font-size-medium !important;
    padding: 5px 3px !important;
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
  &__currency-name {
    color: $--dark-grey;
  }
  &__show-button {
    display: none;
    text-transform: none;
    font-weight: $--font-weight-bold;
    span {
      font-size: $--font-size-medium;
    }
    @include tablet {
      display: inline-flex;
    }
  }
  &__wallet-buttons {
    display: inline-flex;
    margin-bottom: 3px;
    @include tablet {
      display: none;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      outline: none;
    }
    :not(:last-child) {
      border-right: 1px solid rgba($--dark-grey, 0.5);
    }
  }
  &__icon-qrcode {
    margin: 3px 11px;
    width: 14px;
    height: 14px;
    @include tablet {
      display: none;
    }
  }
  &__icon-copy {
    margin: 3px 11px;
    width: 14px;
    height: 14px;
    transition: 0.3s;
  }
}
</style>
