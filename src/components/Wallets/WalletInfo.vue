<template>
  <div class="wallet-info" :class="{ 'wallet-info--compressed': compressed }" @click="uncompressWallet">
    <svg-icon class="wallet-info__background-icon" :name="backgroundIconName"></svg-icon>

    <div class="wallet-info__optional-buttons">
      <v-btn icon class="wallet-info__optional-button" @click="openShareModal">
        <svg-icon name="share" class="wallet-info__icon"></svg-icon>
      </v-btn>
      <v-btn icon class="wallet-info__optional-button" @click="openSettingsModal">
        <svg-icon name="settings" class="wallet-info__icon"></svg-icon>
      </v-btn>
    </div>

    <header class="wallet-info__header">
      <div>
        <span class="wallet-info__crypto-value">0.200332btc</span>
        <span class="wallet-info__fiat-value">3000.04$</span>
      </div>
    </header>

    <div class="wallet-info__address-wrapper">
      <v-tooltip v-model="copyTooltip.value" top :open-on-hover="false" class="wallet-info__tooltip">
        <template #activator="{ on }">
          <button class="wallet-info__button-copy" tabindex="-1" @click="copy">
            <span class="wallet-info__address wallet-info__address--desktop">
              {{ address }}
            </span>

            <span class="wallet-info__address wallet-info__address--tablet">
              {{ `${address.slice(0, 5)}***${address.slice(-5)}` }}
            </span>

            <svg-icon class="wallet-info__icon-copy" name="copy" v-on="on"></svg-icon>
          </button>
        </template>
        <span>Copied</span>
      </v-tooltip>

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
import copy from '@/utils/copy'
import { mapMutations } from 'vuex'
import { ADD_MODAL } from '@/store/modules/Modals'
import { COPY_MENU, INVOICE_FORM, SEND_FORM, SHARE_MODAL, WALLET_SETTINGS } from '@/store/modules/Modals/names'

export default {
  name: 'WalletInfo',
  inject: ['mediaQueries'],
  props: {
    compressed: {
      type: Boolean,
      default: false
    },
    address: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    nameCurrency: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      copyTooltip: {
        value: false,
        timer: 0
      }
    }
  },
  computed: {
    walletAddress() {
      return this.$route.params.walletAddress
    },
    backgroundIconName() {
      return `background/background-${this.nameCurrency.toLowerCase()}`
    }
  },
  beforeDestroy() {
    clearTimeout(this.copyTooltip.timer)
  },
  methods: {
    ...mapMutations({
      mutationAddModal: ADD_MODAL
    }),
    uncompressWallet() {
      this.$emit('uncompress-wallet')
    },
    copy() {
      if (this.mediaQueries.desktop) {
        copy(this.walletAddress)
          .then(() => {
            this.copyTooltip.value = true
            if (this.copyTooltip.timer) {
              clearTimeout(this.copyTooltip.timer)
            }
            this.copyTooltip.timer = setTimeout(() => {
              this.copyTooltip.value = false
            }, 1500)
          })
          .catch(err => {
            console.log('Значение не скопировано', err)
          })
      } else {
        this.openCopyMenu()
      }
    },
    openCopyMenu() {
      this.mutationAddModal({
        name: COPY_MENU,
        info: {
          address: this.walletAddress
        }
      })
    },
    openShareModal() {
      this.mutationAddModal({
        name: SHARE_MODAL,
        info: {
          type: 'wallet',
          data: this.walletAddress
        }
      })
    },
    openInvoiceBlock() {
      this.mutationAddModal({
        name: INVOICE_FORM,
        id: `${INVOICE_FORM + this.walletAddress}`,
        show: true,
        info: {
          address: this.walletAddress
        }
      })
    },
    openSendForm() {
      this.mutationAddModal({
        name: SEND_FORM,
        id: `${SEND_FORM + this.walletAddress}`,
        show: true,
        info: {
          address: this.walletAddress
        }
      })
    },
    openSettingsModal() {
      this.mutationAddModal({
        name: WALLET_SETTINGS,
        id: `${WALLET_SETTINGS + this.walletAddress}`,
        info: {
          walletId: this.walletAddress
        }
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
  --backgroun-icon-top: -30%;

  outline: none;
  position: relative;
  padding: 20px 25px 25px;
  overflow: hidden;
  background: $--white;
  height: 250px;
  border-radius: 12px;
  transition: 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;

  @include tablet {
    height: 220px;
    padding: 20px 15px;
    margin: 20px 40px;
  }

  @include phone {
    margin: 12px;
    padding: 12px 11px;
  }

  &--compressed {
    --margin-button-address: 22px;
    --height-header: 0;
    --backgroun-icon-top: -70%;

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
    top: var(--backgroun-icon-top);
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
  &__tooltip {
    @include tablet {
      display: none;
    }
  }
  &__address {
    &--tablet {
      display: none;
    }
    @include tablet {
      font-size: $--font-size-medium;

      &--desktop {
        display: none;
      }
      &--tablet {
        display: inline;
      }
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
      display: none;
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
      min-width: 0 !important;
    }
    @include phone {
      width: calc(33.3% - 6px);
      margin: 0 3px;
      padding: 0 12px !important;
    }
  }
}
</style>
