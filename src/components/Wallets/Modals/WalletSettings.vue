<template>
  <modal-wrapper value title="Wallet settings" @input="hide" @submit="save" @cancel="close">
    <div class="wallet-settings-modal">
      <form-field v-model="name" placeholder="label"></form-field>
    </div>
  </modal-wrapper>
</template>

<script>
import { mapActions } from 'vuex'
import { UPDATE_WALLET_NAME } from '@/store/modules/Wallets'
import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import FormField from '@/components/UI/Forms/TextField.vue'

export default {
  name: 'ShareModal',
  components: {
    ModalWrapper,
    FormField
  },
  props: {
    walletId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      name: ''
    }
  },
  computed: {
    wallet() {
      return this.$store.getters.siblingList.find(wallet => wallet.address === this.walletId)
    },
    walletName() {
      return this.wallet.name
    }
  },
  watch: {
    walletName: {
      immediate: true,
      handler(val) {
        this.name = val
      }
    }
  },
  methods: {
    ...mapActions({
      actionUpdateWalletName: UPDATE_WALLET_NAME
    }),
    hide() {
      this.$emit('toggle', false)
    },
    close() {
      this.$emit('close')
    },
    save() {
      if (this.name.trim()) this.actionUpdateWalletName({ ...this.wallet, name: this.name })
      this.close()
    }
  }
}
</script>
