<template>
  <div class="send-preview">
    <div class="send-preview__wrapper">
      <wallet-preview v-bind="wallet" class="send-preview__wallet" />

      <div v-for="recipient in recipients" :key="recipient.address" class="send-preview__row">
        <div class="send-preview__field send-preview__field--long">
          <span class="send-preview__label">Send to</span>
          <span class="send-preview__value">{{ recipient.address }}</span>
        </div>
        <div class="send-preview__field send-preview__field--short">
          <span class="send-preview__label">Amount</span>
          <span class="send-preview__value">{{ recipient.amount }}</span>
        </div>
      </div>

      <v-divider class="send-preview__divider" />

      <div class="send-preview__results">
        <span class="send-preview__result-label">Transaction fee: </span>
        <div class="send-preview__result-value">
          <div>
            <span class="send-preview__currency-name">{{ wallet.currencyName }}</span>
            {{ fee }}
          </div>
          <div><span class="send-preview__currency-name">~USD</span>{{ convertedFee }}</div>
        </div>
      </div>

      <div class="send-preview__results">
        <span class="send-preview__result-label">Total balance change: </span>
        <div class="send-preview__result-value">
          <div>
            <span class="send-preview__currency-name">{{ wallet.currencyName }}</span>
            {{ totalBalanceChange }}
          </div>
          <div><span class="send-preview__currency-name">~USD</span>{{ totalConvertedBalanceChange }}</div>
        </div>
      </div>
    </div>

    <div class="send-preview__memo">
      <span class="send-preview__label">Memo</span>
      <span class="send-preview__value">{{ memo }}</span>
    </div>
  </div>
</template>

<script>
import WalletPreview from '@/components/Wallets/WalletPreview.vue'
import { convertAmountToOtherCurrency } from '@/services/converter'

export default {
  name: 'SendPreview',
  components: { WalletPreview },
  props: {
    wallet: { type: Object, required: true },
    recipients: { type: Array, default: () => [] },
    fee: { type: Number, required: true },
    memo: { type: String, default: '' }
  },
  computed: {
    totalBalanceChange() {
      return this.recipients.reduce((acc, { amount }) => acc + Number.parseFloat(amount), 0)
    },
    totalConvertedBalanceChange() {
      return convertAmountToOtherCurrency(this.totalBalanceChange, this.wallet.currencyName, 'USD')
    },
    convertedFee() {
      return convertAmountToOtherCurrency(this.fee, this.wallet.currencyName, 'USD')
    }
  }
}
</script>

<style lang="scss">
.send-preview {
  &__wrapper {
    padding: 16px 12px;
    border-radius: $--main-border-radius;
    background-color: get-theme-for($background, 'secondary') !important;
    margin-bottom: 20px;
  }
  &__wallet {
    background-color: get-theme-for($button, 'primary', 'pressed');
    border-radius: $--main-border-radius;
    margin-bottom: 16px;
  }
  &__row {
    display: flex;
    margin-bottom: 12px;
  }
  &__field {
    background-color: get-theme-for($button, 'primary', 'pressed');
    border-radius: $--main-border-radius;
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
    color: get-theme-for($text, 'secondary');
    font-size: $--font-size-small;
  }
  &__value {
    color: get-theme-for($text, 'primary');
    font-size: $--font-size-extra-small-subtitle;
  }
  &__divider {
    margin: 16px 0;
  }
  &__results {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    padding: 0 0;
    margin-bottom: 10px;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
  }
  &__result-label {
    color: get-theme-for($text, 'secondary');
  }
  &__result-value {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  &__currency-name {
    color: get-theme-for($text, 'secondary');
    margin-right: 4px;
  }

  &__memo {
    padding: 10px 14px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    border-radius: $--main-border-radius;
    background-color: get-theme-for($background, 'secondary');
    border: 1px solid get-theme-for($border-color, 'primary');
    margin-bottom: 32px;
  }
}
</style>
