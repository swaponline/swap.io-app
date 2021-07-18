<template>
  <div class="invoice-preview">
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
        <span class="invoice-form__total-value">
          {{ totalAmount }}
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvoicePreview',
  props: {
    address: { type: String, required: true },
    contact: { type: String, required: true },
    fields: { type: Array, required: true },
    currency: { type: String, required: true },
    totalAmount: { type: [String, Number], required: true }
  }
}
</script>

<style lang="scss">
.invoice-preview {
  padding: 16px 12px;
  border-radius: $--main-border-radius;
  background-color: $--light-grey-2 !important;
  margin-bottom: 30px;

  &__wallet,
  &__field {
    background-color: $--light-grey-4;
    border-radius: $--main-border-radius;
    margin-bottom: 16px;
  }
  &__field {
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
}
</style>
