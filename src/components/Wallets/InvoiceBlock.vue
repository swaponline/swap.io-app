<template>
  <transition-translate>
    <invoice-form
      v-if="visible && viewBlock === 'form'"
      :class="reverseForm ? 'reverse' : ''"
      @submit="submit('form')"
      @preview="showPreview"
      @close="close"
    >
    </invoice-form>
    <invoice-share v-else-if="visible && viewBlock === 'share'" @close="close"></invoice-share>
    <invoice-preview
      v-else-if="visible && viewBlock === 'preview'"
      v-bind="invoice"
      :class="reversePreview ? 'reverse' : ''"
      @close="
        viewBlock = 'form'
        oldBlock = 'preview'
      "
      @submit="submit('preview')"
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
      viewBlock: 'form',
      oldBlock: ''
    }
  },
  computed: {
    reverseForm() {
      return this.oldBlock === 'form' || this.oldBlock === 'preview'
    },
    reversePreview() {
      return this.oldBlock === 'preview'
    }
  },
  methods: {
    async close() {
      this.oldBlock = ''
      await this.$nextTick()
      this.viewBlock = 'form'
      this.$emit('close')
    },
    async showPreview(invoice) {
      this.oldBlock = 'form'
      await this.$nextTick()
      this.viewBlock = 'preview'
      this.invoice = invoice
    },
    async submit(block) {
      this.oldBlock = block
      await this.$nextTick()
      this.viewBlock = 'share'
    }
  }
}
</script>

<style lang="scss">
.reverse {
  &.translate-enter,
  &.translate-leave-to {
    transform: translateX(-100vw);
  }
}
</style>
