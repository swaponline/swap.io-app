<template>
  <div class="invoice-block">
    <transition-translate :reverse="reverseForm">
      <invoice-form v-if="viewBlock === 'form'" @submit="submit('form')" @preview="showPreview" @close="close">
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
  </div>
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
      return this.oldBlock === 'preview'
    }
  },
  beforeRouteLeave(to, from, next) {
    Object.assign(to.meta, { back: true })
    next()
  },
  methods: {
    async close() {
      this.oldBlock = ''
      await this.$nextTick()
      this.viewBlock = 'form'
      this.$router.back()
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
  width: 100%;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  background: $--white;
}
</style>
