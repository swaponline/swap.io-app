<template>
  <div class="wallet-info" :class="compressed ? 'wallet-info--compressed' : ''" @click="uncompressWallet">
    <svg-icon class="wallet-info__background-icon" name="background-btc"></svg-icon>
    <div class="wallet-info__optional-buttons">
      <v-btn icon class="wallet-info__optional-button">
        <svg-icon name="share" class="wallet-info__icon"></svg-icon>
      </v-btn>
      <v-btn icon class="wallet-info__optional-button">
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
            <span class="wallet-info__address">1C9Uae6kyDtPo4ykzd5AJaLzLEZSpEbP3y</span>
            <svg-icon class="wallet-info__icon-copy" name="copy" v-on="on"></svg-icon>
          </button>
        </template>
        <span>Copied</span>
      </v-tooltip>
      <button class="wallet-info__button-qrcode">
        <svg-icon class="wallet-info__icon-qrcode" name="qrcode"></svg-icon>
      </button>
    </div>
    <div class="wallet-info__buttons">
      <v-btn depressed class="wallet-info__button" @click="openInvoiceBlock">Invoice</v-btn>
      <v-btn depressed class="wallet-info__button">Swap</v-btn>
      <v-btn depressed class="wallet-info__button" @click="openSendForm">Send</v-btn>
    </div>
  </div>
</template>

<script>
import copy from '@/utils/copy'
import { mapMutations } from 'vuex'
import { ADD_MODAL } from '@/store/modules/Modals'
import { COPY_MENU, INVOICE_FORM, SEND_FORM } from '@/store/modules/Modals/names'

export default {
  name: 'WalletInfo',
  inject: ['mediaQueries'],
  props: {
    compressed: {
      type: Boolean,
      default: false
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
    openInvoiceBlock() {
      this.mutationAddModal({
        name: INVOICE_FORM,
        info: {
          address: this.walletAddress
        }
      })
    },
    openSendForm() {
      this.mutationAddModal({
        name: SEND_FORM,
        info: {
          address: this.walletAddress
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
  align-items: flex-start;

  @include tablet {
    height: 220px;
    padding: 20px 15px;
    margin: 20px 40px;
  }

  @include phone {
    margin: 12px;
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
  }
  &__crypto-value {
    display: block;
    font-weight: $--font-weight-bold;
    font-size: $--font-size-extra-title;
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
    @include tablet {
      font-size: $--font-size-medium;
    }
  }
  &__button-qrcode {
    outline: none;
    border-left: 1px solid $--grey;
    transition: 0.3s;
    opacity: var(--icon-opacity);
    font-size: $--font-size-small-subtitle;
    line-height: 29px;
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
    line-height: 29px;
    min-width: 144px;
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
    overflow: hidden;
    max-height: 70px;
    @include phone {
      max-height: var(--height-header);
    }
  }
  &__button {
    margin-right: 11px;
    text-transform: none;
    font-weight: $--font-weight-bold;
    font-size: $--font-size-medium !important;
    min-width: 144px;
    @include tablet {
      width: calc(33.3% - 6px);
      margin: 0 3px;
      padding: 0 12px !important;
    }
  }
}
</style>
