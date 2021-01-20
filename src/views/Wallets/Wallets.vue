<template>
  <page-layout class="wallets-layout">
    <template #main-block>
      <list-wallet></list-wallet>
    </template>
    <template #more-info-block>
      <transition name="custom-classes-transition" @after-enter="reverseClass = false">
        <wallet-info
          v-if="queryWallet && activeForm === null"
          :key="queryWallet"
          :class="reverseClass ? 'reverse' : ''"
          :wallet="queryWallet"
          @invoice="invoiceFormVisible = true"
          @activeForm="showForm"
        />
      </transition>
      <div v-if="!queryWallet && activeForm === null" class="wallets-more-block">
        <span>Выберите кошелек для получения дополнительной информации</span>
      </div>
      <invoice-block :visible="activeForm === 'invoice-block'" @close="closeForm"></invoice-block>
      <send-block :visible="activeForm === 'send-block'" @close="closeForm"></send-block>
      <create-wallet-form :visible="activeForm === 'create-wallet-form'" @close="closeForm"></create-wallet-form>
      <create-user-form :visible="activeForm === 'create-user-form'" @close="closeForm"></create-user-form>
    </template>
    <main-actions @activeForm="showForm"></main-actions>
  </page-layout>
</template>

<script>
import PageLayout from '@/layouts/PageLayout/index.vue'
import MainActions from '@/components/Wallets/MainActions.vue'
import CreateWalletForm from '@/components/Wallets/CreateWalletForm.vue'
import CreateUserForm from '@/components/Wallets/CreateUserForm.vue'
import InvoiceBlock from '@/components/Wallets/InvoiceBlock.vue'
import SendBlock from '@/components/Wallets/SendBlock.vue'
import ListWallet from '@/components/Wallets/ListWallet.vue'
import Wallet from './Wallet.vue'

export default {
  name: 'WalletsLayout',
  components: {
    PageLayout,
    MainActions,
    WalletInfo: Wallet,
    CreateWalletForm,
    CreateUserForm,
    InvoiceBlock,
    SendBlock,
    ListWallet
  },
  data() {
    return {
      invoiceFormVisible: false,
      reverseClass: false,
      activeForm: null
    }
  },
  computed: {
    queryWallet() {
      return this.$route.query.wallet || ''
    }
  },
  watch: {
    queryWallet: {
      handler(val) {
        if (val) {
          this.reverseClass = false
          this.closeForm()
        }
      }
    }
  },
  methods: {
    async showForm(name) {
      if (!this.queryWallet) {
        this.$router.push({ name: 'Wallets', query: { wallet: null } })
      }
      this.reverseClass = true
      await this.$nextTick()
      this.activeForm = name
    },
    closeForm() {
      if (!this.queryWallet) {
        this.$router.push({ name: 'Wallets' })
      }
      this.activeForm = null
    }
  }
}
</script>

<style lang="scss">
.wallets-layout {
  display: flex;
  width: 100%;
  position: relative;
  .custom-classes-transition-enter,
  .custom-classes-transition-leave-to {
    &.reverse {
      transform: translateX(-100vw);
    }
  }
  .custom-classes-transition-enter-active,
  .custom-classes-transition-leave-active {
    &.reverse {
      transition: 0.5s;
    }
  }
}
@include tablet {
  .wallets-layout {
    position: relative;
  }
  .custom-classes-transition-enter,
  .custom-classes-transition-leave-to {
    &.reverse {
      position: absolute;
      transform: translateX(-100vw);
    }
  }
  .custom-classes-transition-enter-active,
  .custom-classes-transition-leave-active {
    transition: 0.5s;
  }
}
</style>
