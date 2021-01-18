<template>
  <transition-translate>
    <invoice-form v-if="visible && viewBlock === 'form'" @submit="viewBlock = 'share'" @preview="showPreview">
    </invoice-form>
    <invoice-share v-else-if="visible && viewBlock === 'share'" @close="close"></invoice-share>
    <invoice-preview
      v-else-if="visible && viewBlock === 'preview'"
      v-bind="invoice"
      @close="viewBlock = 'form'"
    ></invoice-preview>
  </transition-translate>
</template>

<script>
import TransitionTranslate from '@/components/Transitions/Translate.vue'
import InvoiceShare from './InvoiceShare.vue'
import InvoiceForm from './InvoiceForm.vue'
import InvoicePreview from './InvoicePreview.vue'

export default {
  name: 'InvoiceBlock',
  components: {
    TransitionTranslate,
    InvoiceForm,
    InvoicePreview,
    InvoiceShare
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      viewBlock: 'form'
    }
  },
  methods: {
    close() {
      this.viewBlock = 'form'
      this.$emit('close')
    },
    showPreview(invoice) {
      this.viewBlock = 'preview'
      this.invoice = invoice
    }
  }
}
</script>

<style lang="scss"></style>
