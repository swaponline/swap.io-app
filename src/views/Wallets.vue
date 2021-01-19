<template>
  <page-layout class="wallets-layout">
    <template #main-block>
      <div class="wallets-layout__list">
        <header-list />
        <v-list class="py-0">
          <v-list-item v-for="wallet in wallets" :key="wallet.name" class="px-0">
            <v-list-item
              v-if="wallet.subWallets.length === 1"
              link
              exact
              color="purple"
              class="wallets-layout__wallet-item"
              :to="{ name: 'Wallets', query: { wallet: wallet.subWallets[0].address } }"
            >
              <v-list-item-icon class="wallets-layout__icon-wrapper mr-4">
                <svg-icon class="wallets-layout__icon" name="btc" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="d-flex mr-4 justify-space-between">
                  <div>{{ wallet.name }}</div>
                  <div>{{ wallet.value }}</div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-group
              v-else
              class="wallets-layout__wallet-item"
              color="purple"
              active-class="wallets-layout__active-list-group"
            >
              <template #activator>
                <v-list-item-icon class="wallets-layout__icon-wrapper mr-4">
                  <svg-icon class="wallets-layout__icon" name="btc" />
                </v-list-item-icon>
                <v-list-item-title class="d-flex">
                  <span>{{ wallet.name }}</span>
                  <v-spacer></v-spacer>
                  <span>{{ wallet.value }}</span>
                </v-list-item-title>
              </template>
              <v-list-item
                v-for="(subWallet, i) in wallet.subWallets"
                :key="i"
                link
                color="purple"
                exact
                :to="{ name: 'Wallets', query: { wallet: subWallet.address } }"
              >
                <v-list-item-content>
                  <v-list-item-title class="d-flex mr-4"
                    >{{ subWallet.name }} <v-spacer /> {{ subWallet.value }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list-item>
        </v-list>
        <v-spacer />
      </div>
    </template>
    <template #more-info-block>
      <transition
        name="custom-classes-transition"
        enter-class="wallets-layout__animation"
        leave-to-class="wallets-layout__animation"
        enter-active-class="wallets-layout__animation-active"
        leave-active-class="wallets-layout__animation-active"
      >
        <wallet-info
          v-if="queryWallet && activeForm === null"
          :key="queryWallet"
          :wallet="queryWallet"
          @invoice="invoiceFormVisible = true"
        />
        <div v-else class="wallets-more-block">
          <span v-if="activeForm === null">Выберите кошелек для получения дополнительной информации</span>
          <create-wallet-form :visible="activeForm === 'wallet'" @close="activeForm = null"></create-wallet-form>
          <create-user-form :visible="activeForm === 'user'" @close="activeForm = null"></create-user-form>
        </div>
      </transition>
    </template>
    <main-actions @activeForm="activeForm = $event"></main-actions>
  </page-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { GET_ACCOUNT_ID } from '@/store/modules/Wallets'
import PageLayout from '@/layouts/PageLayout/index.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import HeaderList from '@/components/Wallets/HeaderList.vue'
import MainActions from '@/components/Wallets/MainActions.vue'
import CreateWalletForm from '@/components/Wallets/CreateWalletForm.vue'
import CreateUserForm from '@/components/Wallets/CreateUserForm.vue'
import Wallet from './Wallet.vue'

export default {
  name: 'WalletsLayout',
  components: {
    SvgIcon,
    PageLayout,
    HeaderList,
    MainActions,
    WalletInfo: Wallet,
    CreateWalletForm,
    CreateUserForm
  },
  data() {
    return {
      invoiceFormVisible: false,
      activeForm: null
    }
  },
  computed: {
    queryWallet() {
      return this.$route.query.wallet || ''
    },
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
    })
  }
}
</script>

<style lang="scss">
.wallets-layout {
  display: flex;
  width: 100%;
  &__wallet-item {
    width: 100%;
    border-bottom: 1px solid rgba($color: $--black, $alpha: 0.2);
  }
  &__list {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid $--grey;
    overflow-y: auto;
    background: $--white;
  }
  &__currnecy {
    color: rgba($color: $--white, $alpha: 0.5);
    margin-right: 4px;
  }
  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    min-width: 38px;
    height: 38px;
    background: $--grey;
  }
  &__icon {
    width: 20px;
    height: 20px;
    fill: $--white;
  }
  &__active-list-group {
    color: rgba($--black, 0.87);
  }
  .v-speed-dial {
    position: absolute;
    @include tablet {
      position: fixed;
      bottom: 80px !important;
      z-index: 9999;
      transition: 0.5s;
      &--wallet {
        transform: translate(100vw, 0);
      }
    }
  }
}
@include tablet {
  .wallets-layout {
    position: relative;
    &__animation {
      position: relative;
      transform: translate(0, 0);
      opacity: 1;
    }
    &__animation-active {
      transition: 1s;
    }
  }
}
</style>
