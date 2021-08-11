<template>
  <div class="invoice-preview">
    <div class="invoice-preview__wrapper">
      <div class="invoice-preview__field">
        <span class="invoice-preview__label">Address</span>
        <span class="invoice-preview__value">{{ address }}</span>
      </div>

      <div class="invoice-preview__field">
        <span class="invoice-preview__label">Bill to</span>
        <span class="invoice-preview__value">{{ contact }}</span>
      </div>

      <div v-for="(field, index) in fields" :key="index" class="d-flex">
        <div class="invoice-preview__field invoice-preview__field--long">
          <span class="invoice-preview__label">Description</span>
          <span class="invoice-preview__value">{{ field.description }}</span>
        </div>
        <div class="invoice-preview__field invoice-preview__field--short">
          <span class="invoice-preview__label">Amount</span>
          <span class="invoice-preview__value">{{ field.amount }}</span>
        </div>
      </div>

      <v-divider class="invoice-preview__divider" />

      <div class="invoice-preview__amount">
        <span>Total: </span>
        <span>
          {{ currency }}
          <span class="invoice-preview__total-value">
            {{ totalAmount }}
          </span>
        </span>
      </div>
    </div>

    <div class="invoice-preview__wrapper">
      <h6 class="invoice-preview__subtitle">Invoice QR</h6>
      <div class="invoice-preview__qr-image">
        <img :src="qrCodeSrc" />
      </div>

      <div class="invoice-preview__actions">
        <v-tooltip v-model="copyTooltip.value" top :open-on-hover="false">
          <template #activator="{}">
            <swap-button class="invoice-preview__action" @click="copyLink">Copy link</swap-button>
          </template>
          <span>Copied</span>
        </v-tooltip>

        <swap-button class="invoice-preview__action">Send</swap-button>
      </div>
    </div>
  </div>
</template>

<script>
import { encodeObjectToQueryParameters } from '@/utils/http'
import copy from '@/utils/copy'
import QRCode from 'qrcode-generator'

export default {
  name: 'InvoicePreview',
  props: {
    address: { type: String, required: true },
    contact: { type: String, required: true },
    fields: { type: Array, required: true },
    currency: { type: String, required: true },
    totalAmount: { type: [String, Number], required: true }
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
    qrCodeSrc() {
      const qr = new QRCode(0, 'M')
      qr.addData(this.shareUrl)
      qr.make()
      return qr.createDataURL(4, 0)
    },
    shareUrl() {
      // Example: bitcoincash:qp0qca2j3jey9af7x69r6ata6wlnxz90sqhyzxdsvu?amount=1&message=test%20me%20please
      const params = {
        address: this.address,
        contact: this.contact,
        currency: this.currency,
        description: this.fields.map(f => f.description || ''),
        amount: this.fields.map(f => f.amount)
      }
      const queryParams = encodeObjectToQueryParameters(params)

      return `${window.location.origin}/invoice?${queryParams}`
    }
  },
  methods: {
    copyLink() {
      copy(this.shareUrl)
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
  &__wrapper {
    padding: 16px 12px;
    border-radius: $--main-border-radius;
    background-color: var(--main-input-background) !important;
    margin-bottom: 30px;
  }

  &__field {
    background-color: var(--field-background);
    border-radius: $--main-border-radius;
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
    &--scrollable {
      overflow-x: auto;
    }
  }
  &__label,
  &__value {
    font-weight: $--font-weight-semi-bold;
    letter-spacing: 0.01em;
  }
  &__label {
    color: var(--secondary-text);
    font-size: $--font-size-small;
  }
  &__value {
    color: var(--primary-text);
    font-size: $--font-size-extra-small-subtitle;
  }
  &__amount {
    display: flex;
    justify-content: space-between;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
    color: var(--secondary-text);
    @include phone {
      margin: 20px 0;
      font-size: $--font-size-medium;
    }
  }
  &__total-value {
    color: var(--primary-text);
  }
  &__divider {
    margin: 16px 0;
  }
  &__subtitle {
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
    color: $--dark-grey;
  }
  &__qr-image {
    margin: 16px auto;
    display: flex;
    justify-content: center;
  }
  &__actions {
    display: flex;
    justify-content: space-between;
  }
  &__action {
    background-color: var(--additional-button-background) !important;
    flex: 0 1 50%;
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
      margin-left: 8px;
    }
  }
}
</style>
