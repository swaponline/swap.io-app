<template>
  <div>
    <template v-for="(modal, index) in modals">
      <component
        :is="modal.name"
        :key="modal.name + index"
        v-bind="modal.info"
        :value="modal.show !== undefined ? modal.show : true"
        @close="mutationCloseModal(modal.id)"
        @toggle="toggle(modal.id, $event)"
        @close-all="mutationCloseAllModal"
      />
    </template>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { CLOSE_MODAL, CLOSE_ALL_MODAL, TOGGLE_MODAL, MODULE_NAME as MODALS_MODULE } from '@/store/modules/Modals'

import CopyMenu from './CopyMenu.vue'
import InvoiceForm from './InvoiceForm/index.vue'
import SendForm from './SendForm/index.vue'
import TransactionDetails from './TransactionDetails.vue'
import EditFee from './EditFee.vue'
import ShareModal from './ShareModal.vue'
import WalletSettings from './WalletSettings.vue'
import WalletCreate from './WalletCreate.vue'
import AddNewCurrency from './AddNewCurrency.vue'
import IncomingInvoice from './IncomingInvoice.vue'

export default {
  name: 'AllModalsWallet',
  components: {
    CopyMenu,
    InvoiceForm,
    SendForm,
    EditFee,
    ShareModal,
    WalletSettings,
    TransactionDetails,
    WalletCreate,
    AddNewCurrency,
    IncomingInvoice
  },
  computed: {
    modals() {
      return this.$store.state[MODALS_MODULE].modals
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
      mutationCloseAllModal: CLOSE_ALL_MODAL,
      mutationToggleModal: TOGGLE_MODAL
    }),
    toggle(id, show) {
      this.mutationToggleModal({ id, show })
    }
  }
}
</script>
