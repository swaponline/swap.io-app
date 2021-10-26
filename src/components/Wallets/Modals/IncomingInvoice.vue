<template>
  <modal-wrapper
    :value="value"
    title="Incoming invoice"
    confirm-button-label="Save"
    cancel-button-label="Discard"
    @input="hide"
    @submit="submit"
    @cancel="close"
  >
    <div class="incoming-invoice">
      <invoice-preview
        :address="address"
        :contact="contact"
        :fields="fields"
        :currency="currency"
        :total-amount="totalAmount"
      />

      <swap-button large block class="incoming-invoice__button-pay">Pay</swap-button>
    </div>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import InvoicePreview from '@/components/Wallets/Modals/InvoiceForm/Preview.vue'

export default {
  name: 'IncomingInvoice',
  components: { ModalWrapper, InvoicePreview },
  props: {
    value: { type: Boolean, default: false }
  },
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
      const descriptions = this.$route.query.description || []
      const fields = (this.$route.query.amount || []).map((val, index) => ({
        amount: parseFloat(val),
        description: descriptions[index] || ''
      }))
      return fields
    },
    totalAmount() {
      return this.fields.reduce((acc, item) => acc + item.amount, 0)
    }
  },
  watch: {
    address(val) {
      if (!val) {
        this.close()
      }
    }
  },
  methods: {
    hide() {
      this.$emit('toggle', false)
    },
    close() {
      this.$emit('close')
    },
    submit() {
      this.$emit('close-all')
    }
  }
}
</script>

<style lang="scss">
.incoming-invoice {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__button-pay {
    margin-top: 24px;
    margin-bottom: 16px;
  }
}
</style>
