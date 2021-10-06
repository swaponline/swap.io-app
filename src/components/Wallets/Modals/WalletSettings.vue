<template>
  <modal-wrapper value title="Wallet settings" @input="close" @submit="save" @cancel="close">
    <div class="wallet-settings-modal">
      <form-field v-model="localName" placeholder="Name"></form-field>
    </div>
  </modal-wrapper>
</template>

<script>
import { mapActions } from 'vuex'
import { UPDATE_WALLET } from '@/store/modules/Profile'
import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import FormField from '@/components/UI/Forms/TextField.vue'

export default {
  name: 'ShareModal',
  components: { ModalWrapper, FormField },
  props: {
    name: { type: String, default: '' },
    address: { type: String, required: true },
    coin: { type: String, required: true }
  },
  data() {
    return {
      localName: this.name
    }
  },
  computed: {
    wallet() {
      return this.$store.getters.currentSubWallets.find(wallet => wallet.address === this.address)
    }
  },
  methods: {
    ...mapActions({
      actionUpdateWallet: UPDATE_WALLET
    }),
    close() {
      this.$emit('close')
    },
    save() {
      if (this.name.trim()) this.actionUpdateWallet({ ...this.wallet, name: this.localName })
      this.close()
    }
  }
}
</script>
