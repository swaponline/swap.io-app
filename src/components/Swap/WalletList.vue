<template>
  <div class="swap-wallet-list">
    <v-list-item
      class="swap-wallet-list__wallet-item px-0"
      :class="{ 'swap-wallet-list__wallet-item--is-open-form': isOpenExternalForm }"
    >
      <external-button
        :is-open-external-form="isOpenExternalForm"
        @openExternalForm="openExternalForm"
      ></external-button>
    </v-list-item>

    <external-form v-if="isOpenExternalForm" @input="setWallet"></external-form>

    <v-list v-else class="swap-wallet-list__main-list py-0">
      <v-list-item v-for="wallet in wallets" :key="wallet.name" class="swap-wallet-list__wallet-item px-0">
        <swap-wallet-item
          v-if="wallet.subWallets.length === 1"
          v-bind="wallet"
          @selectWallet="setWallet"
        ></swap-wallet-item>
        <swap-wallet-group v-else v-bind="wallet" @selectWallet="setWallet"></swap-wallet-group>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { GET_ACCOUNT_ID } from '@/store/modules/Wallets'
import SwapWalletGroup from './WalletGroup.vue'
import SwapWalletItem from './WalletItem.vue'
import ExternalForm from './ExternalForm.vue'
import ExternalButton from './ExternalButton.vue'

export default {
  name: 'SwapWalletList',
  components: {
    ExternalForm,
    ExternalButton,
    SwapWalletGroup,
    SwapWalletItem
  },
  data() {
    return {
      isOpenExternalForm: false
    }
  },
  computed: {
    wallets() {
      return this.$store.getters.currentListWallets
    }
  },
  mounted() {
    this.actionGetAccountId()
  },
  methods: {
    ...mapActions({
      actionGetAccountId: GET_ACCOUNT_ID
    }),
    openExternalForm() {
      this.isOpenExternalForm = !this.isOpenExternalForm
    },
    setWallet({ nameCurrency, wallet }) {
      this.$emit('setWallet', { nameCurrency, wallet })
    }
  }
}
</script>

<style lang="scss">
.swap-wallet-list {
  display: flex;
  flex-direction: column;
  position: absolute;
  background: $--white;
  right: 0;
  top: 0;
  width: 100%;
  max-width: 305px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  @include tablet {
    max-width: none;
    transition: 0.5s;
    height: 100%;
  }
  &__wallet-item {
    flex: 0 0 auto;
    justify-content: center;
    &:after {
      content: '';
      position: absolute;
      top: 100%;
      min-width: 320px;
      width: calc(100% - 30px);
      min-height: 1px;
      background: $--light-grey;
      transition: 0.3s;
    }
    &--is-open-form {
      &:after {
        opacity: 0;
      }
    }
  }
}
</style>
