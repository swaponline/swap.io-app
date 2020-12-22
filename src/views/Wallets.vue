<template>
  <page-layout class="wallets-layout">
    <template #main-block>
      <div class="wallets-layout__list">
        <v-toolbar class="wallets-layout__header-list" color="purple">
          <v-toolbar-items class="align-center">
            <v-img :src="photo" width="40" height="40" class="rounded-circle" position="center top"></v-img>
          </v-toolbar-items>
          <v-spacer></v-spacer>
          <v-toolbar-items class="wallets-layout__currnecy align-center">
            <span>USD</span>
          </v-toolbar-items>
          <v-toolbar-items class="wallets-layout__summ align-center">
            <span>9,943.02</span>
          </v-toolbar-items>
        </v-toolbar>
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
                <v-list-item-title class="d-flex mr-4">
                  {{ wallet.name }}
                  <v-spacer />
                  {{ wallet.value }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-group v-else class="wallets-layout__wallet-item">
              <template v-slot:activator>
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
        <v-btn color="primary" class="mb-6 ml-auto mr-4" relative right fab>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
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
        <wallet-info v-if="queryWallet" :wallet="queryWallet" />
      </transition>
      <div v-if="!queryWallet">
        Выберите кошелек для получения дополнительной информации
      </div>
    </template>
  </page-layout>
</template>

<script>
import { MODULE_NAME as WALLETS_NAME } from '@/store/modules/Wallets'
import PageLayout from '@/layouts/PageLayout/index.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import Wallet from './Wallet.vue'

export default {
  name: 'WalletsLayout',
  components: {
    SvgIcon,
    PageLayout,
    WalletInfo: Wallet
  },
  computed: {
    queryWallet() {
      return this.$route.query.wallet || ''
    },
    photo() {
      // eslint-disable-next-line vue/max-len
      return `https://sun9-60.userapi.com/impg/zCF4saFPwlwi0PtC41GIQ1WP30Khy-thQ9FtuA/b6bn4u-Y9D4.jpg?size=646x1148&quality=96&proxy=1&sign=b1ff76233f1ee088d886dd165748e481&type=album`
    },
    wallets() {
      return this.$store.state[WALLETS_NAME].list
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
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
  }
  &__header-list {
    font-size: 18px;
    max-height: 64px;
  }
  &__currnecy {
    color: rgba($color: $--white, $alpha: 0.5);
    margin-right: 4px;
  }
  &__summ {
    color: $--white;
    font-weight: 500;
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
      transition: 0.5s;
    }
  }
}
</style>
