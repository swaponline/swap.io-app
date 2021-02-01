<template>
  <v-dialog :value="true" content-class="invoice-block" transition="slide-x-reverse-transition">
    <transition-translate :reverse="reverseForm">
      <invoice-form
        v-if="viewBlock === 'form'"
        :address="address"
        @submit="submit('form')"
        @preview="showPreview"
        @close="close"
      >
      </invoice-form>
      <invoice-preview
        v-if="viewBlock === 'preview'"
        v-bind="invoice"
        @close="
          oldBlock = 'preview'
          viewBlock = 'form'
        "
        @submit="submit('preview')"
      ></invoice-preview>
      <invoice-share v-if="viewBlock === 'share'" @close="close"></invoice-share>
    </transition-translate>
  </v-dialog>
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
    address: {
      type: String,
      default: ''
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
.invoice-block {
  position: relative;
  height: 100%;
  max-height: none !important;
  width: 40%;
  margin-left: auto;
  border-radius: 0;
  overflow: hidden;
  background: $--white;
  margin-right: 0;
  @include tablet {
    width: 100%;
  }
}
</style>
