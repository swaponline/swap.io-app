<template>
  <div>
    <template>
      <component
        :is="info.name"
        :key="info.name"
        v-bind="info.info"
        :value="info.show !== undefined ? info.show : true"
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
const SendForm = () => import(/* webpackChunkName: "SendForm" */ './SendForm.vue')

export default {
  name: 'AllModalsWallet',
  components: {
    CopyMenu,
    InvoiceForm,
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
