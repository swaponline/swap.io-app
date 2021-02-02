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
        <span class="invoice-preview__wallet">
          Wallet address: {{ formatAddress }}
          <div class="invoice-preview__buttons">
            <v-tooltip v-model="copyTooltip.value" top :open-on-hover="false" class="wallet-info__tooltip">
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
          <tr v-for="item in amountFields" :key="item.id">
            <td class="invoice-preview__table-cell text-left">{{ item.description }}</td>
            <td v-if="type.labelQuantity" class="invoice-preview__table-cell text-right">{{ item.quantity }}</td>
            <td class="invoice-preview__table-cell text-right">
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
import copy from '@/utils/copy'
import { mapMutations } from 'vuex'
import { ADD_MODAL } from '@/store/modules/Modals'
import { COPY_MENU } from '@/store/modules/Modals/names'
import FormWrapper from '../FormWrapper.vue'

export default {
  name: 'InvoicePreview',
  inject: ['mediaQueries'],
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
  data() {
    return {
      copyTooltip: {
        value: false,
        timer: 0
      }
    }
  },
  computed: {
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
      this.$emit('close')
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
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }
  &__wallet {
    display: flex;
    align-items: flex-end;

    @include tablet {
      justify-content: space-between;
    }

    button {
      text-transform: none;
      font-weight: $--font-weight-bold;
      span {
        font-size: $--font-size-medium;
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
  &__show-button {
    display: none;
    @include tablet {
      display: inline-block;
    }
  }
  &__buttons {
    display: flex;
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
