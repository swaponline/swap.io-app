<template>
  <div class="wallet">
    <header-wallet :address="wallet" @openMenu="openMenu" />
    <div class="wallet__content">
      <div class="wallet__info" :class="{ 'wallet__info--open-menu': open !== null }">
        <p class="wallet__value">
          <span class="wallet__icon-value"><svg-icon name="btc"/></span>
          {{ currentWallet.value }}
        </p>
        <p class="wallet__value-in-usd"><span>USD</span> 3000.04</p>

        <v-tooltip v-model="show" top>
          <template #activator="{attrs}">
            <button class="wallet__address" v-bind="attrs" @click="copy">
              {{ currentWallet.address }}
              <v-icon class="wallet__icon-copy">mdi-content-copy</v-icon>
            </button>
          </template>
          <span>Copied</span>
        </v-tooltip>
        <div class="wallet__buttons">
          <v-btn class="wallet__button" color="primary" outlined>
            <v-icon class="wallet__icon-invoice">mdi-arrow-down-bold-circle</v-icon>
            Invoice
          </v-btn>
        </div>
        <v-sheet elevation="4" class="mt-8 mb-2">
          <v-tabs ref="tabs" v-model="tab" background-color="white" fixed-tabs>
            <v-tab href="#all">All</v-tab>
            <v-tab href="#confirmed">Confirmed</v-tab>
            <v-tab href="#pending">Pending</v-tab>
            <v-tab href="#invoices">Invoices</v-tab>
          </v-tabs>
        </v-sheet>
        <v-tabs-items v-model="tab">
          <v-slide-x-transition>
            <v-tab-item v-show="tab" :key="tab" :value="tab">
              <list-transactions :address="currentWallet.address" :filter-type="tab"></list-transactions>
            </v-tab-item>
          </v-slide-x-transition>
        </v-tabs-items>
      </div>
      <div
        class="wallet__side-menu"
        :class="{
          'wallet__side-menu--open-menu': open !== null
        }"
      >
        <wallets-menu
          :visible="open === 'share'"
          :await-status="open === 'menu'"
          :list="shareLinks"
          tabindex="-1"
          @closed="openMenu(null)"
        >
          <template #default="{ item }">
            <share-link v-bind="item" @copy="copy" />
          </template>
        </wallets-menu>
        <wallets-menu
          :visible="open === 'menu'"
          :await-status="open === 'share'"
          :list="shareLinks"
          tabindex="-1"
          @closed="openMenu(null)"
        >
          <template #default="{ item }"> {{ item.name }} </template>
        </wallets-menu>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderWallet from '@/components/Wallets/HeaderWallet.vue'
import WalletsMenu from '@/components/Wallets/WalletsMenu.vue'
import ListTransactions from '@/components/Wallets/ListTransactions.vue'
import ShareLink from '@/components/Wallets/ShareLink.vue'
import SvgIcon from '@/components/SvgIcon.vue'

export default {
  name: 'Wallet',
  components: {
    HeaderWallet,
    WalletsMenu,
    ListTransactions,
    ShareLink,
    SvgIcon
  },
  props: {
    wallet: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tab: 'all',
      open: null,
      show: false,
      tooltipTimer: undefined
    }
  },
  computed: {
    currentWallet() {
      if (this.wallet) {
        return this.$store.getters.siblingList.find(el => el.address === this.wallet)
      }
      return {}
    },
    shareLinks() {
      return [
        {
          name: 'Telegram',
          icon: 'mdi-telegram',
          target: '_blank',
          url: 'https://web.telegram.org/'
        },
        {
          name: 'WhatsApp',
          icon: 'mdi-whatsapp',
          target: '_blank',
          url: 'https://web.whatsapp.com/'
        },
        {
          name: 'Facebook',
          icon: 'mdi-facebook-box',
          target: '_blank',
          url: 'https://www.facebook.com/'
        }
      ]
    }
  },
  watch: {
    route: {
      deep: true,
      immediate: true,
      handler() {
        this.open = null
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.tooltipTimer)
  },
  methods: {
    openMenu(key) {
      if (this.open === key) {
        this.open = null
      } else {
        this.open = key
      }
      setTimeout(() => {
        this.$refs.tabs.onResize()
      }, 500)
    },
    copy() {
      if (navigator && navigator.clipboard) {
        navigator.clipboard
          .writeText(this.wallet)
          .then(() => {
            this.show = true
            if (this.tooltipTimer) {
              clearTimeout(this.tooltipTimer)
            }
            this.tooltipTimer = setTimeout(() => {
              this.show = false
            }, 1500)
          })
          .catch(err => {
            console.log('Значение не скопировано', err)
          })
      }
    }
  }
}
</script>

<style lang="scss">
.wallet {
  height: 100%;
  background: $--white;
  &__content {
    position: relative;
    width: 100%;
    display: flex;
    overflow: hidden;
    height: calc(100vh - 128px);
  }
  &__info {
    background: $--white;
    padding-top: 16px;
    text-align: center;
    width: 100%;
    height: 100%;
    font-size: $--font-size-medium;
    transition: 0.5s;
    overflow-y: auto;
    overflow-x: hidden;
    &--open-menu {
      width: 75%;
    }
  }
  &__value {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $--font-size-subtitle;
    font-weight: $--font-weight-bold;
  }
  &__icon-value {
    width: 30px;
    height: 30px;
    background: $--grey;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    margin-right: 5px;
    svg {
      width: 14px;
      height: 14px;
      fill: #ffffff;
    }
  }
  &__value-in-usd {
    font-weight: $--font-weight-medium;
    span {
      opacity: 0.5;
    }
  }
  &__address {
    opacity: 0.5;
    outline: none;
    padding-left: 24px;
    &:hover {
      .wallet__icon-copy {
        opacity: 1;
      }
    }
    @include tablet {
      font-size: $--font-size-small;
      padding-left: 0;
      word-break: break-all;
    }
  }
  &__icon-copy {
    opacity: 0;
    @include phone {
      display: none !important;
    }
  }
  &__button {
    margin: 0 16px;
  }
  &__side-menu {
    background: $--white;
    position: absolute;
    z-index: 2;
    right: 0;
    height: 100%;
    width: 25%;
    transition: 0.5s;
    overflow-y: auto;
    overflow-x: hidden;
    border-left: 1px solid $--grey;
    transform: translateX(100%);
    &--open-menu {
      transform: translateX(0%);
    }
  }
}
@include tablet {
  .wallet {
    &__content {
      flex-direction: column;
      height: calc(100vh - 176px);
    }
    &__info {
      order: 2;
      &--open-menu {
        width: 100%;
      }
    }
    &__side-menu {
      order: 1;
      position: relative;
      width: 100%;
      min-height: 0;
      height: 0;
      overflow: hidden;
      left: 0;
      transform: translateX(0);
      border-left: none;
      &--open-menu {
        height: auto;
        min-height: 256px;
        max-height: 256px;
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
      }
    }
  }
  // Переопределим некоторые стили для vuetify
  // уберем левый отступ у вкладок на маленьких устройствах
  .v-slide-group__prev {
    &--disabled {
      display: none !important;
    }
  }
}
</style>
