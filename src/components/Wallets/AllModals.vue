<template>
  <div>
    <template v-for="(modal, index) in modals">
      <component
        :is="modal.name"
        :key="modal.name + index"
        v-bind="modal.info"
        :value="modal.show !== undefined ? modal.show : modal.name === info.name"
        @close="mutationCloseModal"
      />
    </template>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { CLOSE_MODAL, MODULE_NAME as MODALS_MODULE } from '@/store/modules/Modals'

const CopyMenu = () => import(/* webpackChunkName: "CopyMenu" */ './CopyMenu.vue')
const InvoiceForm = () => import(/* webpackChunkName: "InvoiceForm" */ './InvoiceForm.vue')
const InvoicePreview = () => import(/* webpackChunkName: "InvoicePreview" */ './InvoicePreview.vue')
const SendForm = () => import(/* webpackChunkName: "SendForm" */ './SendForm.vue')

export default {
  name: 'AllModalsWallet',
  components: {
    CopyMenu,
    InvoiceForm,
    InvoicePreview,
    SendForm
  },
  computed: {
    modals() {
      return this.$store.state[MODALS_MODULE].modals
    },
    info() {
      return this.modals[this.modals.length - 1] || {}
    }
  },
  mounted() {
    try {
      document.body.appendChild(this.$el)
    } catch (e) {
      throw Error(e)
    }
  },
  beforeDestroy() {
    document.body.removeChild(this.$el)
    this.modals.forEach(() => {
      this.mutationCloseModal()
    })
  },
  methods: {
    ...mapMutations({
      mutationCloseModal: CLOSE_MODAL
    })
  }
}
</script>
