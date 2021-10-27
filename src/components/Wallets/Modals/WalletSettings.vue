<template>
  <modal-wrapper value title="Wallet settings" @input="close" @submit="save" @cancel="close">
    <div class="wallet-settings-modal">
      <form-field v-model="localName" placeholder="Name"></form-field>
    </div>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import FormField from '@/components/UI/Forms/TextField.vue'
import { walletsService } from '@/services/wallets'

export default {
  name: 'WalletSettings',
  components: { ModalWrapper, FormField },
  props: {
    name: { type: String, default: '' },
    address: { type: String, default: '' },
    coin: { type: String, default: '' },
    networkId: { type: String, default: '' }
  },
  data() {
    return {
      localName: this.name
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    save() {
      const newName = this.localName.trim()

      if (newName !== this.name) {
        walletsService.updateWalletName({
          address: this.address,
          coin: this.coin,
          networkId: this.networkId,
          name: newName
        })
      }

      this.close()
    }
  }
}
</script>
