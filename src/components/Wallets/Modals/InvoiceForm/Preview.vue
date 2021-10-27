<template>
  <div class="invoice-preview">
    <div class="invoice-preview__address">
      <wallet-selector readonly :address="address" :items="[address]" />
    </div>
    <form-indent title="Bill to:" :text="contact" />

    <v-row v-for="(field, index) in fields" :key="index" dense>
      <v-col class="col-8">
        <form-indent class="invoice-preview__field" title="Description" :text="field.description" />
      </v-col>
      <v-col class="col-4">
        <form-indent class="invoice-preview__field" title="Amount" :text="field.amount" />
      </v-col>
    </v-row>

    <v-divider class="invoice-preview__divider" />

    <div class="invoice-preview__amount">
      <span>Amount: </span>
      <span>{{ currency }} {{ totalAmount }}</span>
    </div>
  </div>
</template>

<script>
import FormIndent from '@/components/UI/Forms/Indent.vue'
import WalletSelector from '@/components/Wallets/WalletSelector.vue'

export default {
  name: 'InvoicePreview',
  components: { FormIndent, WalletSelector },
  props: {
    address: { type: Object, required: true },
    contact: { type: String, required: true },
    fields: { type: Array, required: true },
    currency: { type: String, required: true },
    totalAmount: { type: [String, Number], required: true }
  }
}
</script>

<style lang="scss">
.invoice-preview {
  &__address {
    margin-bottom: 16px;
  }

  &__field {
    margin-bottom: 0;
  }

  &__amount {
    display: flex;
    justify-content: space-between;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
    color: get-theme-for($text, 'secondary');
    @include phone {
      margin: 20px 0;
      font-size: $--font-size-medium;
    }
  }
  &__divider {
    margin: 16px 0;
  }
}
</style>
