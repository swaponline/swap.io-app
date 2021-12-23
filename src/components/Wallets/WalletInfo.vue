<template>
  <div class="wallet-info" :class="{ 'wallet-info--compressed': compressed }" @click="uncompressWallet">
    <coin-logo class="wallet-info__background-icon" :path="logo" :name="coin" />

    <div class="wallet-info__optional-buttons">
      <swap-button fab small class="wallet-info__optional-button" @click="openShareModal">
        <v-icon class="wallet-info__icon">mdi-export-variant</v-icon>
      </swap-button>
      <swap-button fab small class="wallet-info__optional-button" @click="openSettingsModal">
        <v-icon class="wallet-info__icon">mdi-tune</v-icon>
      </swap-button>
    </div>

    <header class="wallet-info__header">
      <div>
        <span class="wallet-info__crypto-value">
          {{ value }} <span class="grey--text">{{ coin }}</span>
        </span>
        <span class="wallet-info__fiat-value">3000.04 USD</span>
      </div>
    </header>

    <div class="wallet-info__address-wrapper">
      <swap-copy-wrapper>
        <template #default="{ copy, tooltopOn }">
          <button
            v-ripple="{ center: true }"
            class="wallet-info__button-copy"
            tabindex="-1"
            @click="mediaQueries.desktop ? copy(address) : openCopyMenu()"
            v-on="tooltopOn"
          >
            <span class="wallet-info__address">{{ mediaQueries.desktop ? address : minifiedAddress }}</span>
            <svg-icon class="wallet-info__icon-copy" name="copy" />
          </button>
        </template>
      </swap-copy-wrapper>

      <button class="wallet-info__button-qrcode" @click="openShareModal">
        <svg-icon class="wallet-info__icon-qrcode" name="qrcode"></svg-icon>
      </button>
    </div>

    <div class="wallet-info__buttons">
      <swap-button class="wallet-info__button" @click="openInvoiceBlock">Invoice</swap-button>
      <swap-button :to="{ name: 'Swap' }" class="wallet-info__button">Swap</swap-button>
      <swap-button class="wallet-info__button" @click="openSendForm">Send</swap-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { ADD_MODAL } from '@/store/modules/Modals'
import { COPY_MENU, INVOICE_FORM, SEND_FORM, SHARE_MODAL, WALLET_SETTINGS } from '@/store/modules/Modals/names'
import { minifyAddress } from '@/utils/common'
import CoinLogo from '@/components/Wallets/CoinLogo.vue'

export default {
  name: 'WalletInfo',
  components: { CoinLogo },
  inject: ['mediaQueries'],
  props: {
    compressed: { type: Boolean, default: false },
    address: { type: String, default: '' },
    name: { type: String, default: '' },
    value: { type: Number, default: 0 },
    coin: { type: String, default: '' },
    logo: { type: String, default: '' },
    networkId: { type: String, default: '' }
  },
  computed: {
    minifiedAddress() {
      return minifyAddress(this.address)
    },
    walletId() {
      return `${this.coin}-${this.networkId}-${this.address}`
    }
  },
  methods: {
    ...mapMutations({
      mutationAddModal: ADD_MODAL
    }),
    uncompressWallet() {
      this.$emit('uncompress-wallet')
    },
    openCopyMenu() {
      this.mutationAddModal({
        name: COPY_MENU,
        info: {
          address: this.address,
          coin: this.coin,
          networkId: this.networkId
        }
      })
    },
    openShareModal() {
      const { href } = this.$router.resolve({
        name: 'Wallets',
        params: { address: this.address, coin: this.coin.toLowerCase(), networkId: this.networkId }
      })
      this.mutationAddModal({
        name: SHARE_MODAL,
        info: {
          data: { value: this.address, label: 'Wallet id:' },
          shareUrl: `${window.location.origin}${href}`
        }
      })
    },
    openInvoiceBlock() {
      this.mutationAddModal({
        name: INVOICE_FORM,
        id: `${INVOICE_FORM + this.walletId}`,
        show: true,
        info: {
          address: this.address,
          coin: this.coin,
          networkId: this.networkId
        }
      })
    },
    openSendForm() {
      this.mutationAddModal({
        name: SEND_FORM,
        id: `${SEND_FORM + this.walletId}`,
        show: true,
        info: {
          address: this.address,
          networkId: this.networkId,
          coin: this.coin
        }
      })
    },
    openSettingsModal() {
      this.mutationAddModal({
        name: WALLET_SETTINGS,
        id: `${WALLET_SETTINGS + this.walletId}`,
        info: { networkId: this.networkId, coin: this.coin, address: this.address, name: this.name }
      })
    }
  }
}
</script>

<style lang="scss">
.wallet-info {
  --icon-opacity: 0;
  --margin-button-address: 0;
  --height-header: 70px;
  --background-icon-top: -30%;

  outline: none;
  position: relative;
  padding: 20px 25px 25px;
  overflow: hidden;
  background: get-theme-for($background, 'primary');
  height: 250px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  transition: $--theme-transition;

  @include tablet {
    height: 220px;
    padding: 20px 15px;
    margin: 0 40px 20px;
  }

  @include phone {
    margin: 0 12px 12px;
    padding: 12px;
  }

  &--compressed {
    --margin-button-address: 22px;
    --height-header: 0;
    --background-icon-top: -70%;

    height: 140px;
    cursor: pointer;

    @include tablet {
      padding: 20px 15px;
      margin: 20px 40px;
    }

    @include phone {
      border-radius: 12px 12px 0 0;
      height: 60px;
      margin: 12px 12px 0;
      padding: 20px 15px 0;
      box-shadow: inset 0px -3px 5px -1px rgba(0, 0, 0, 0.2);
    }
  }
  &:hover {
    --icon-opacity: 1;
  }
  &__background-icon {
    position: absolute;
    z-index: 0;
    right: -15%;
    top: var(--background-icon-top);
    width: 500px;
    height: 500px;
    transform: rotate(-30deg);
    transition: 0.5s;
    pointer-events: none;

    @include tablet {
      width: 370px;
      height: 370px;
      top: -15%;
      right: -15%;
    }
    @include phone {
      opacity: 0;
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    transition: 0.5s;
    max-height: var(--height-header);
    @include phone {
      max-height: 100px;
    }
  }
  &__optional-buttons {
    position: absolute;
    right: 25px;

    @include tablet {
      top: 15px;
    }
    @include phone {
      top: 12px;
      right: 11px;
    }
  }
  &__optional-button {
    position: relative;
    background-color: get-theme-for($background, 'primary') !important;

    &:not(:last-child) {
      margin-right: 6px;
    }
  }
  &__crypto-value {
    display: block;
    font-weight: $--font-weight-bold;
    font-size: $--font-size-title;
    margin-right: 15px;
    line-height: 41px;
    @include tablet {
      font-size: $--font-size-subtitle;
      line-height: 33px;
    }
  }
  &__fiat-value {
    display: block;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-medium;
    color: $--grey;
  }
  &__sys-icons {
    display: flex;
    align-items: center;
  }
  &__icon {
    width: 18px;
    height: 23px;
    color: get-theme-for($icon, 'active') !important;
  }
  &__address-wrapper {
    position: relative;
    z-index: 1;
    display: flex;
    margin: 0 0 var(--margin-button-address);
    overflow: hidden;
    transition: 0.3s;

    @include phone {
      margin: 0 0;
      max-height: var(--height-header);
    }
  }
  &__address {
    @include tablet {
      font-size: $--font-size-medium;
    }
  }
  &__button-qrcode {
    outline: none;
    border-left: 1px solid $--light-grey-1;
    transition: 0.3s;
    opacity: var(--icon-opacity);
    font-size: $--font-size-small-subtitle;
    line-height: 22px;
    @include tablet {
      display: none;
    }
  }
  &__button-copy {
    outline: none;
    display: flex;
    align-items: center;
    text-transform: none;
    font-size: $--font-size-small-subtitle;
    font-weight: $--font-weight-regular;
    line-height: 22px;
    min-width: 144px;
    word-break: break-all;
    @include tablet {
      border-bottom: 1px solid rgba($color: $--black, $alpha: 0.05);
      border-top: 1px solid rgba($color: $--black, $alpha: 0.05);
    }
  }
  &__icon-qrcode {
    margin: 0 11px;
    width: 14px;
    height: 14px;
    @include tablet {
      display: none;
    }
  }
  &__icon-copy {
    margin: 0 11px;
    width: 14px;
    height: 14px;
    transition: 0.3s;
    opacity: var(--icon-opacity);
    @include tablet {
      opacity: 1;
    }
  }
  &__buttons {
    display: flex;
    overflow: hidden;
    width: auto;
    max-height: 70px;
    margin: 0 -6px;
    @include tablet {
      margin: 0 -5px;
    }
    @include phone {
      margin: 0 -3px;
      max-height: var(--height-header);
    }
  }
  &__button {
    min-height: 42px;
    margin: 0 6px;
    width: 144px;
    @include tablet {
      width: 114px;
      margin: 0 5px;
    }
    @include phone {
      width: calc(33.3% - 6px);
      margin: 0 3px;
    }
  }
}
</style>
