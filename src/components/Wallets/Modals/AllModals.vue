<template>
  <div>
    <template v-for="(modal, index) in modals">
      <component
        :is="modal.name"
        :key="modal.name + index"
        v-bind="modal.info"
        :value="modal.show !== undefined ? modal.show : modal.name === info.name"
        @close="mutationCloseModal"
        @close-all="mutationCloseAllModal"
      />
    </template>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { CLOSE_MODAL, CLOSE_ALL_MODAL, MODULE_NAME as MODALS_MODULE } from '@/store/modules/Modals'

const CopyMenu = () => import(/* webpackChunkName: "CopyMenu" */ './CopyMenu.vue')
const InvoiceForm = () => import(/* webpackChunkName: "InvoiceForm" */ './InvoiceForm.vue')
const InvoicePreview = () => import(/* webpackChunkName: "InvoicePreview" */ './InvoicePreview.vue')
const SendForm = () => import(/* webpackChunkName: "SendForm" */ './SendForm.vue')
const SendPreview = () => import(/* webpackChunkName: "SendPreview" */ './SendPreview.vue')
const EditFee = () => import(/* webpackChunkName: "EditFee" */ './EditFee.vue')
const ShareModal = () => import(/* webpackChunkName: "ShareModal" */ './ShareModal.vue')

export default {
  name: 'AllModalsWallet',
  components: {
    CopyMenu,
    InvoiceForm,
    InvoicePreview,
    SendForm,
    SendPreview,
    EditFee,
    ShareModal
  },
  computed: {
    modals() {
      console.log(this.$store.state[MODALS_MODULE].modals)
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
      mutationCloseModal: CLOSE_MODAL,
      mutationCloseAllModal: CLOSE_ALL_MODAL
    })
  }
}
</script>
