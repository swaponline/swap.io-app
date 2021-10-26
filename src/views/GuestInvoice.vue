<template>
  <div class="guest-invoice">
    <div class="guest-invoice__header">
      <swap-logo />
      <swap-button class="guest-invoice__action" primary>Create wallet</swap-button>
    </div>

    <div class="guest-invoice__wrapper">
      <h4 class="guest-invoice__title">Incoming invoice</h4>
      <div class="guest-invoice__qr-wrapper">
        <img :src="qrCodeSrc" />
      </div>

      <div class="guest-invoice__field">
        <span class="guest-invoice__label">Address</span>
        <span class="guest-invoice__value">{{ address }}</span>
      </div>

      <div class="guest-invoice__field">
        <span class="guest-invoice__label">Bill to</span>
        <span class="guest-invoice__value">{{ contact }}</span>
      </div>

      <div v-for="(field, index) in fields" :key="index" class="d-flex">
        <div class="guest-invoice__field guest-invoice__field--long">
          <span class="guest-invoice__label">Description</span>
          <span class="guest-invoice__value">{{ field.description }}</span>
        </div>
        <div class="guest-invoice__field guest-invoice__field--short">
          <span class="guest-invoice__label">Amount</span>
          <span class="guest-invoice__value">{{ field.amount }}</span>
        </div>
      </div>

      <v-divider class="guest-invoice__divider" />

      <div class="guest-invoice__amount">
        <span>Total: </span>
        <span>
          {{ currency }}
          <span class="invoice-form__total-value">
            {{ totalAmount }}
          </span>
        </span>
      </div>
    </div>

    <div class="guest-invoice__wrapper">
      <h4 class="guest-invoice__title">Payment</h4>

      <div class="guest-invoice__add-wallet">
        <v-icon class="guest-invoice__add-wallet-icon">mdi-plus</v-icon>
        <span class="guest-invoice__add-wallet-text">Add wallet</span>
      </div>

      <span class="guest-invoice__text"
        >Create wallet at <a href="https://proto.swap.io" target="_blank" class="guest-invoice__link">swap.io</a> and
        easily settle and share invoices.</span
      >

      <swap-button large block class="guest-invoice__button">Pay by Credit card via Partner</swap-button>
    </div>
  </div>
</template>

<script>
import SwapLogo from '@/components/UI/SwapLogo.vue'
import QRCode from 'qrcode-generator'

export default {
  name: 'GuestInvoice',
  components: { SwapLogo },
  computed: {
    address() {
      return this.$route.query.address
    },
    contact() {
      return this.$route.query.contact
    },
    currency() {
      return this.$route.query.currency
    },
    fields() {
      const descriptions = this.$route.query.description || null
      const fields = this.$route.query.amount.map((val, index) => ({
        amount: parseFloat(val),
        description: descriptions[index] || ''
      }))
      return fields
    },
    totalAmount() {
      return this.fields.reduce((acc, item) => acc + item.amount, 0)
    },
    qrCodeSrc() {
      const qr = new QRCode(0, 'M')
      qr.addData(window.location.href)
      qr.make()
      return qr.createDataURL(4, 0)
    }
  }
}
</script>

<style lang="scss">
.guest-invoice {
  margin: 0 auto 20px;
  max-width: 466px;
  width: 100%;

  &__header {
    padding: 16px 20px;
    background-color: $--white;
    border-bottom-left-radius: $--main-border-radius;
    border-bottom-right-radius: $--main-border-radius;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  &__action {
    background-color: var(--main-color) !important;
    color: $--white !important;
  }

  &__wrapper {
    padding: 16px 12px;
    border-radius: $--main-border-radius;
    background-color: $--white;
    margin-bottom: 10px;
  }
  &__title {
    font-size: $--font-size-small-subtitle;
    line-height: 26px;
    font-weight: $--font-weight-semi-bold;
    margin-bottom: 16px;
  }
  &__qr-wrapper {
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
  }
  &__field {
    background-color: $--light-grey-6;
    border-radius: $--main-border-radius;
    margin-bottom: 16px;
    margin-bottom: 8px;
    padding: 6px 14px 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-overflow: ellipsis;

    &--long {
      flex: 1 0 60%;
    }
    &--short {
      margin-left: 8px;
      flex: 1 0 35%;
    }
  }
  &__label,
  &__value {
    font-weight: $--font-weight-semi-bold;
    letter-spacing: 0.01em;
  }
  &__label {
    color: $--dark-grey;
    font-size: $--font-size-small;
  }
  &__value {
    color: $--black;
    font-size: $--font-size-extra-small-subtitle;
  }
  &__amount {
    display: flex;
    justify-content: space-between;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
    color: $--dark-grey;
    @include phone {
      margin: 20px 0;
      font-size: $--font-size-medium;
    }
  }
  &__divider {
    margin: 16px 0;
  }
  &__subtitle {
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
    color: $--dark-grey;
  }

  &__add-wallet {
    display: flex;
    align-items: center;
    padding: 9px 14px;
    border-radius: $--main-border-radius;
    background-color: $--light-grey-6;
    margin-bottom: 8px;
    transition: all 0.3s;
    &:hover {
      background-color: $--light-grey-5;
      cursor: pointer;
    }
  }
  &__add-wallet-icon {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    background-color: $--grey-4;
    margin-right: 14px;
    color: $--grey-3 !important;
  }
  &__add-wallet-text {
    color: $--dark-grey;
    font-size: $--font-size-button;
    font-weight: $--font-weight-semi-bold;
  }

  &__text {
    color: $--dark-grey;
  }
  &__link {
    color: $--black !important;
  }
  &__button {
    margin-top: 20px;
  }
}
</style>
